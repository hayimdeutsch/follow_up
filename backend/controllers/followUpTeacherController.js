import * as dbService from "../services/dbService.js";
import CustomError from "../utils/CustomError.js";
import { sendFromTeacher } from "../services/emailService.js";
import generateToken from "../utils/generateToken.js";
import validateHasFields from "../utils/validateHasFields.js";
import { formatFollowupEmail } from "../utils/emailTemplates.js";

const getStudentFollowUps = async (req, res, next) => {
  try {
    const { studentId } = req.params;
    const followUps = await dbService.getStudentFollowUps(studentId);
    if (!followUps) {
      throw new CustomError("Student not found", 404);
    }
    res.status(200).json(followUps);
  } catch (error) {
    next(error);
  }
};

const createFollowUp = async (req, res, next) => {
  try {
    validateFollowUpFields(req.body);
    const { title, options, emailText, questionnaire, meeting } = req.body;

    const { studentId } = req.params;
    const student = await dbService.getStudentById(studentId);
    if (!student) {
      throw new CustomError("Student not found", 404);
    }

    const teacher = await dbService.getTeacherById(req.user.id);

    let meetingId = null;
    let questionnaireId = null;

    if (options.isMeeting) {
      const newMeeting = await dbService.createMeeting(meeting);
      meetingId = newMeeting._id;
    }

    if (options.isQuestionnaire) {
      const newQuestionnaire = await dbService.createQuestionnaire(
        questionnaire
      );
      questionnaireId = newQuestionnaire._id;
    }

    let token = null;

    do {
      token = generateToken();
    } while (await dbService.getFollowUpByToken(token));

    const followUp = await dbService.createFollowUp(
      token,
      title,
      teacher._id,
      studentId,
      meetingId,
      questionnaireId
    );
    await dbService.addFollowupToStudent(studentId, followUp._id);

    const emailContent = formatFollowupEmail(
      emailText,
      followUp.token,
      options
    );

    await sendFromTeacher(teacher, student.email, title, emailContent);

    res.status(201).json(followUp);
  } catch (error) {
    next(error);
  }
};

const getFollowUp = async (req, res, next) => {
  try {
    const { followupId } = req.params;
    const followUp = await dbService.getFollowUpById(followupId);
    if (!followUp) {
      throw new CustomError("FollowUp not found", 404);
    }
    res.status(200).json(followUp);
  } catch (error) {
    next(error);
  }
};

const updateFollowUp = async (req, res, next) => {
  try {
    const { studentId, followupId } = req.params;
    const { questionnaire, meeting } = req.body;

    if (!(questionnaire || meeting)) {
      throw new CustomError("Missing required fields", 400);
    }

    const student = await dbService.getStudentById(studentId);
    if (!student) {
      throw new CustomError("Student not found", 404);
    }

    const existingFollowUp = await dbService.getFollowUpById(followupId);
    if (!existingFollowUp) {
      throw new CustomError("FollowUp not found", 404);
    }

    if (existingFollowUp.submitted) {
      throw new CustomError("FollowUp already submitted", 409);
    }

    if (questionnaire) {
      if (!questionnaire.questions) {
        throw new CustomError("Missing required fields", 400);
      }
      await dbService.updateQuestionnaireById(
        existingFollowUp.questionnaire._id,
        questionnaire.questions
      );
    }

    if (meeting) {
      if (!meeting.timeSlots) {
        throw new CustomError("Missing required fields", 400);
      }
      await dbService.updateMeetingById(
        existingFollowUp.meeting._id,
        meeting.timeSlots
      );
    }
    const updatedFollowUp = await dbService.getFollowUpById(followupId);
    res.status(200).json(updatedFollowUp);
  } catch (error) {
    next(error);
  }
};

const deleteFollowUp = async (req, res, next) => {
  try {
    const { studentId, followupId } = req.params;
    const student = await dbService.getStudentById(studentId);
    if (!student) {
      throw new CustomError("Student not found", 404);
    }
    const followUp = await dbService.deleteFollowUpById(followupId);
    if (!followUp) {
      throw new CustomError("FollowUp not found", 404);
    }
    await dbService.deleteFollowUpFromStudent(followUp.student, followupId);
    res.status(204).json({ message: "Follow up deleted" });
  } catch (error) {
    next(error);
  }
};

const validateFollowUpFields = (reqBody) => {
  validateHasFields(reqBody, ["title", "options", "emailText"]);

  const { options, questionnaire, meeting } = reqBody;

  if (!options.isQuestionnaire && !options.isMeeting) {
    throw new CustomError(
      "Followup must have either a questionnaire or meeting",
      400
    );
  }

  if (options.isQuestionnaire) {
    validateHasFields(reqBody, ["questionnaire"]);
    validateHasFields(questionnaire, ["title", "questions"]);
  }

  if (options.isMeeting) {
    validateHasFields(reqBody, ["meeting"]);
    validateHasFields(meeting, ["topic", "duration", "timeSlots"]);
  }
};

export {
  getStudentFollowUps,
  createFollowUp,
  getFollowUp,
  updateFollowUp,
  deleteFollowUp,
};
