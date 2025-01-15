import mongoose from "mongoose";

const { Schema } = mongoose;

const TeacherSchema = new Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  approved: { type: Boolean, default: false },
  phone: String,
  googleId: { type: String },
  students: [{ type: Schema.Types.ObjectId, ref: "Student" }],
  googleTokens: {
    accessToken: String,
    refreshToken: String,
  },
});

TeacherSchema.index(
  { googleId: 1 },
  {
    unique: true,
    partialFilterExpression: { googleId: { $exists: true, $ne: null } },
  }
);

const Teacher = mongoose.model("Teacher", TeacherSchema);

export default Teacher;
