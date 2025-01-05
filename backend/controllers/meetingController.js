import * as dbService from "../services/dbService.js";
import { scheduleCalendarEvent } from "../services/calendarService.js";
import CustomError from "../utils/CustomError.js";

const createMeeting = async (req, res, next) => {
  try {
    const { topic, duration, timeSlots, token } = req.body;
    const teacherId = req.user._id;
    const studentId = req.params.studentId;

    if (!topic || !duration || !timeSlots || !token) {
      throw new CustomError("Missing required fields", 400);
    }

    const meeting = await dbService.createMeeting({
      teacher: teacherId,
      student: studentId,
      topic,
      duration,
      timeSlots,
      token,
    });

    res.status(201).json(meeting);
  } catch (error) {
    next(error);
  }
};

const getMeetingByToken = async (req, res, next) => {
  try {
    const { token } = req.params;
    const meeting = await dbService.getMeetingByToken(token);
    if (!meeting) {
      throw new CustomError("Meeting not found", 404);
    }
    res.status(200).json(meeting);
  } catch (error) {
    next(error);
  }
};

const confirmMeeting = async (req, res, next) => {
  try {
    const { token } = req.params;
    const { selectedTimeSlot } = req.body;

    const meeting = await dbService.getMeetingByToken(token);

    const studentName = `${meeting.student.firstName} ${meeting.student.lastName}`;

    const event = scheduleCalendarEvent(
      meeting.teacher,
      studentName,
      meeting.student.email,
      selectedTimeSlot
    );

    const confirmedMeeting = await dbService.confirmMeeting(
      token,
      selectedTimeSlot,
      event.id
    );

    res.status(200).json({ meeting: confirmedMeeting });
  } catch (error) {
    next(error);
  }
};

export { createMeeting, getMeetingByToken, confirmMeeting };
