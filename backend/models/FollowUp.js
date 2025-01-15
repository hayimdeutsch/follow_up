import mongoose from "mongoose";

const Schema = mongoose.Schema;

const FollowUpSchema = new Schema({
  token: { type: String, required: true, unique: true },
  title: { type: String, required: true },
  student: { type: Schema.Types.ObjectId, ref: "Student", required: true },
  teacher: { type: Schema.Types.ObjectId, ref: "Teacher", required: true },
  questionnaire: {
    type: Schema.Types.ObjectId,
    ref: "Questionnaire",
    default: null,
  },
  meeting: { type: Schema.Types.ObjectId, ref: "Meeting", default: null },
  submitted: { type: Boolean, default: false },
  submittedAt: { type: Date },
});

const FollowUp = mongoose.model("FollowUp", FollowUpSchema);

export default FollowUp;
