import mongoose from "mongoose";

const { Schema } = mongoose;

const meetingSchema = new Schema({
  topic: { type: String, required: true },
  duration: { type: Number, required: true },
  timeSlots: [
    {
      startTime: { type: Date, required: true },
      endTime: { type: Date, required: true },
    },
  ],
  selectedTimeSlot: {
    startTime: Date,
    endTime: Date,
  },
  status: {
    type: String,
    enum: ["awaiting_selection", "confirmed", "completed", "canceled"],
    default: "awaiting_selection",
  },
  googleEventId: String,
});

const Meeting = mongoose.model("Meeting", meetingSchema);

export default Meeting;
