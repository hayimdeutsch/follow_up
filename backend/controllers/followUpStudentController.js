import * as dbService from "../services/dbService.js";
import CustomError from "../utils/CustomError.js";
import { scheduleCalendarEvent } from "../services/calendarService.js";
import { sendFromSystem } from "../services/emailService.js";
import validateHasFields from "../utils/validateHasFields.js";
import { followupSubmissionTemplate } from "../utils/emailTemplates.js";

const getFollowUp = async (req, res, next) => {
  try {
    const { token } = req.params;
    const followUp = await dbService.getFollowUpByToken(token);
    if (!followUp) {
      throw new CustomError("FollowUp not found", 404);
    }
    if (followUp.submitted) {
      throw new CustomError("FollowUp already submitted", 409);
    }
    res.status(200).json({
      token: followUp.token,
      title: followUp.title,
      student: followUp.student,
      questionnaire: followUp.questionnaire,
      meeting: followUp.meeting,
    });
  } catch (error) {
    next(error);
  }
};

const submitFollowUp = async (req, res, next) => {
  try {
    const { token } = req.params;
    const followUp = await dbService.getFollowUpByToken(token);
    if (!followUp) {
      throw new CustomError("FollowUp not found", 404);
    }
    if (followUp.submitted) {
      throw new CustomError("FollowUp already submitted", 409);
    }
    const { selectedTimeSlot, questions } = req.body;
    if (!selectedTimeSlot && !questions) {
      throw new CustomError(
        "Must provide either selectedTimeSlot or questions",
        400
      );
    }

    if (selectedTimeSlot) {
      validateHasFields(selectedTimeSlot, ["startTime", "endTime"]);
      const meetingEvent = await scheduleCalendarEvent(
        followUp.teacher,
        followUp.student.firstName + " " + followUp.student.lastName,
        followUp.student.email,
        followUp.meeting.topic,
        selectedTimeSlot
      );
      // const meetingEvent = {
      //   id: "mockEventId",
      //   start: new Date(selectedTimeSlot),
      //   end: new Date(selectedTimeSlot),
      // };
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

    const submittedFollowUp = await dbService.submitFollowUpByToken(token);
    const emailText = followupSubmissionTemplate(
      followUp.teacher.firstName,
      followUp.student.firstName + " " + followUp.student.lastName,
      followUp.student._id,
      followUp._id
    );

    await sendFromSystem(
      followUp.teacher.email,
      "FollowUp Submitted",
      emailText
    );
    res.status(200).json(submittedFollowUp);
  } catch (error) {
    next(error);
  }
};

export { getFollowUp, submitFollowUp };
