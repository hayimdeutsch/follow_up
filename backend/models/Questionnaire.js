import mongoose from "mongoose";
import QuestionSchema from "./Question.js";

const { Schema } = mongoose;

const QuestionnaireSchema = new Schema({
  title: { type: String, required: true },
  questions: [QuestionSchema],
});

const Questionnaire = mongoose.model("Questionnaire", QuestionnaireSchema);

export default Questionnaire;
