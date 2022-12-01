import * as mongoose from 'mongoose';

export const CourseSchema = new mongoose.Schema(
  {
    _id: {
      type: mongoose.Schema.Types.ObjectId,
      index: true,
      required: true,
      auto: true
    },
    courseCode: {
      type: String,
      required: true
    },
    courseName: {
      type: String,
      required: true
    },
    courseFee: {
      type: Number,
      required: true
    },
    unitsNeeded: {
      type: Number,
      required: true
    },
    isQuotaCourse: {
      type: Boolean,
      required: true
    }
  },
  { collection: 'courses', _id: false }
);

CourseSchema.pre('save', function (next: Function) {
  console.log('saving...');
  next();
});

