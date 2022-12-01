
import * as mongoose from 'mongoose';


export const TeacherSchema = new mongoose.Schema(
  {
    _id: {
      type: mongoose.Schema.Types.ObjectId,
      index: true,
      required: true,
      auto: true
    },
    teacherID: {
      type: String,
      required: true
    },
    teacherName: {
      type: String,
      required: true
    },
    schoolEmail: {
      type: String,
      required: true
    },
    department: {
      type: String,
      required: true
    },
    contactNumber: {
      type: String,
      required: true
    },
    coursesTaught: {
      type: [String],
      required: true
    },
    monthsEmployed: {
      type: Number,
      required: true
    }
  },
  { collection: 'teachers', _id: false },
);

TeacherSchema.pre('save', function (next: Function) {
  console.log('saving...');
  next();
});

