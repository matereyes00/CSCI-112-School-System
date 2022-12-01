import * as mongoose from 'mongoose';

export const QPISchema = new mongoose.Schema(
  {
    _id: {
      type: mongoose.Schema.Types.ObjectId,
      index: true,
      required: true,
      auto: true
    },
    studentID: {
      type: String,
      required: true
    },
    studentYear: {
      type: String,
      required: true
    },
    QPI: {
      type: Number,
      required: true
    },
    semester: {
      type: String,
      required: true
    }
  },
  { collection: 'qpi', _id: false }
);

QPISchema.pre('save', function (next: Function) {
  console.log('saving...');
  next();
});

