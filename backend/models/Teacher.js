import mongoose from "mongoose";

const { Schema } = mongoose;

const TeacherSchema = new Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  approved: { type: Boolean, default: false },
  phone: String,
  googleId: { type: String, required: true, unique: true },
  students: [{ type: Schema.Types.ObjectId, ref: "Student" }],
  googleTokens: {
    accessToken: String,
    refreshToken: String,
  },
});

const Teacher = mongoose.model("Teacher", TeacherSchema);

export default Teacher;
