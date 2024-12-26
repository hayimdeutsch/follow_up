import mongoose from "mongoose";

const { Schema } = mongoose;

const StudentSchema = new Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true },
  eventdate: { type: Date, required: true },
  teacher: { type: Schema.Types.ObjectId, ref: "Teacher", required: true },
  questionnaires: [{ type: Schema.Types.ObjectId, ref: "Questionnaire" }],
  meetings: [
    {
      type: Schema.Types.ObjectId,
      ref: "Meeting",
    },
  ],
  followupEmails: [
    {
      type: { type: String, enum: ["2month", "6month", "1year"] },
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
  "followupEmails.scheduledDate": 1,
  "followupEmails.status": 1,
});

const Student = mongoose.model("Student", StudentSchema);

export default Student;
