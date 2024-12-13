import mongoose from "mongoose";
import QuestionSchema from "./Question";

const { Schema } = mongoose;

const TemplateSchema = new Schema({
  title: { type: String, required: true },
  description: String,
  questions: [QuestionSchema],
  createdBy: { type: Schema.Types.ObjectId, ref: "Teacher" },
});

const Template = mongoose.model("Template", TemplateSchema);

export default Template;
