import mongoose from 'mongoose';

const { Schema } = mongoose;

const meetingSchema = new Schema({
  teacher: { type: Schema.Types.ObjectId, ref: 'Teacher', required: true },
  student: { type: Schema.Types.ObjectId, ref: 'Student', required: true },
  topic: { type: String, required: true },
  duration: { type: Number, required: true }, // minutes
  timeSlots: [{
    startTime: { type: Date, required: true },
    endTime: { type: Date, required: true }
  }],
  selectedTimeSlot: {
    startTime: Date,
    endTime: Date
  },
  status: { 
    type: String, 
    enum: ['awaiting_selection', 'confirmed', 'completed', 'canceled'], 
    default: 'awaiting_selection' 
  },
  googleEventId: String,
  createdAt: { type: Date, default: Date.now }
});

const Meeting = mongoose.model('Meeting', meetingSchema);

export default Meeting;