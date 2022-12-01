
import * as mongoose from 'mongoose';


export const StudentSchema = new mongoose.Schema(
  {
    _id: {
      type: mongoose.Schema.Types.ObjectId,
      index: true,
      required: true,
      auto: true
    },
    studentID: {
      type: String,
      required: true,
    },
    studentName: {
      type: String,
      required: true,
    },
    studentYear: {
      type: String,
      required: true
    },
    courseName: {
      type: String,
      required: true
    },
    department: {
      type: String,
      required: true
    },
    birthday: {
      type: String,
      required: true
    },
    primaryEmail: {
      type: String,
      required: true
    },
    secondaryEmail: {
      type: String,
      required: true
    },
    landline: {
      type: String,
      required: false
    },
    contactNo: {
      type: String,
      required: true
    },
    unitsTaken: {
      type: String,
      required: true
    },
    hasHoldOrder: {
      type: Boolean,
      required: true
    },
    hasAnsweredAISISEvals: {
      type: Boolean,
      required: true
    }
  },
  { collection: 'students', _id: false },
);

StudentSchema.pre('save', function (next: Function) {
  console.log('saving...');
  next();
});

