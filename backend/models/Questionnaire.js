import mongoose from "mongoose";
import QuestionSchema from "./Question.js";

const { Schema } = mongoose;

const QuestionnaireSchema = new Schema({
  title: { type: String, required: true },
  questions: [QuestionSchema],
  submitted: { type: Boolean, default: false },
  submittedAt: Date,
});

const Questionnaire = mongoose.model("Questionnaire", QuestionnaireSchema);

export default Questionnaire;
