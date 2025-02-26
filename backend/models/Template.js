import mongoose from "mongoose";
import QuestionSchema from "./Question.js";

const { Schema } = mongoose;

const TemplateSchema = new Schema({
  title: { type: String, required: true, unique: true },
  description: String,
  questions: [QuestionSchema],
});

const Template = mongoose.model("Template", TemplateSchema);

export default Template;
