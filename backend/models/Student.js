import mongoose from "mongoose";

const { Schema } = mongoose;

const StudentSchema = new Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true },
  eventDate: { type: Date, required: true },
  teacher: { type: Schema.Types.ObjectId, ref: "Teacher", required: true },
  followUps: [{ type: Schema.Types.ObjectId, ref: "FollowUp" }],
  scheduledEmails: [
    {
      scheduledDate: Date,
      status: {
        type: String,
        enum: ["pending", "sent", "cancelled"],
        default: "pending",
      },
      sentAt: Date,
      retryCount: { type: Number, default: 0 },
    },
  ],
});

StudentSchema.index({
  "scheduledEmails.scheduledDate": 1,
  "scheduledEmails.status": 1,
});

const Student = mongoose.model("Student", StudentSchema);

export default Student;
