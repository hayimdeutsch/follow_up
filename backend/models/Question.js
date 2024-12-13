import mongoose from "mongoose";

const Schema = mongoose.Schema;

const QuestionSchema = new Schema({
  question: { type: String, required: true },
  hasRange: { type: Boolean, default: false },
  hasSentence: { type: Boolean, default: false },
  range: {
    min: { type: Number },
    max: { type: Number },
    studentAnswer: { type: Number }
  },
  sentenceAnswer: { type: String }
}, { _id: false });

QuestionSchema.pre('save', function(next) {
  if (!this.hasRange && !this.hasSentence) {
    throw new Error('Question must have at least one answer type enabled');
  }
  next();
});

export default QuestionSchema;