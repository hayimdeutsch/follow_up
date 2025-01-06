import dbService from "../services/dbService.js";
import CustomError from "../utils/CustomError.js";
import { scheduleCalendarEvent } from "../services/calendarService.js";
import { sendFromTeacher } from "../services/emailService.js";

const createFollowup = async (req, res, next) => {
  try {
    const { token, questionnaire, meeting } = req.body;
    const studentId = req.params.studentId;

    const teacher = await dbService.getTeacherByGoogleId(req.user.googleId);
    const student = await dbService.getStudentById(studentId);

    if (!student) {
      throw new CustomError("Student not found", 404);
    }

    if (!token || (!questionnaire && !meeting)) {
      throw new CustomError("Missing required fields", 400);
    }

    let meetingId = null;
    let questionnaireId = null;

    if (meeting) {
      const newMeeting = await dbService.createMeeting({
        meeting,
      });
      meetingId = newMeeting._id;
    }

    if (questionnaire) {
      const newQuestionnaire = await dbService.createQuestionnaire({
        questionnaire,
      });
      questionnaireId = newQuestionnaire._id;
    }

    const followUp = await dbService.createFollowup(
      token,
      teacher._id,
      studentId,
      meetingId,
      questionnaireId
    );

    await dbService.addFollowupToStudent(studentId, followUp._id);

    res.status(201).json(followUp);
  } catch (error) {
    next(error);
  }
};

const getFollowupByToken = async (req, res, next) => {
  try {
    const { token } = req.params;

    const followup = await dbService.getFollowUpByToken(token.toString());
    if (!followup) {
      throw new CustomError("FollowUp not found", 404);
    }
    res.status(200).json(followup);
  } catch (error) {
    next(error);
  }
};

const submitFollowup = async (req, res, next) => {
  try {
    const { token } = req.params;
    const { subject, emailText, questions, selectedTimeSlot } = req.body;

    if (!emailText || !subject || (!questions && !selectedTimeSlot)) {
      throw new CustomError("Missing required fields", 400);
    }

    const followUp = await dbService.getFollowUpByToken(token);
    if (!followUp) {
      throw new CustomError("FollowUp not found", 404);
    }

    if (selectedTimeSlot) {
      const meetingEvent = await scheduleCalendarEvent(
        followUp.teacher,
        followUp.student.firstName + " " + followUp.student.lastName,
        followUp.student.email,
        selectedTimeSlot
      );
      await dbService.confirmMeeting(
        followUp.meeting._id,
        selectedTimeSlot,
        meetingEvent.id
      );
    }

    if (questions) {
      await dbService.submitQuestionnaire(
        followUp.questionnaire._id,
        questions
      );
    }

    const submittedFollowUp = await dbService.submitFollowup(token);

    await sendFromTeacher(
      followUp.teacher.email,
      followUp.student.email,
      subject,
      emailText
    );

    res.status(200).json(submittedFollowUp);
  } catch (error) {
    next(error);
  }
};

export { createFollowup, getFollowupByToken, submitFollowup };
