import mongoose from 'mongoose';

const { Schema } = mongoose;

const TeacherSchema = new Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phone: String,
  googleId: { type: String, required: true, unique: true },
  picture: String,
  students: [{ type: Schema.Types.ObjectId, ref: 'Student' }],
  googleTokens: {
    accessToken: String,
    refreshToken: String,
    expiryDate: Number
  }
});

const Teacher = mongoose.model('Teacher', TeacherSchema);

export default Teacher;