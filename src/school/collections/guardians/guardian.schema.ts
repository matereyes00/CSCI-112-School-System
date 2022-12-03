import * as mongoose from 'mongoose';

export const GuardianSchema = new mongoose.Schema(
  {
    _id: {
      type: mongoose.Schema.Types.ObjectId,
      index: true,
      required: true,
      auto: true
    },
    guardianID: {
      type: String,
      required: true
    },
    studentID: {
      type: [String],
      required: true
    },
    contactNumber: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true
    },
  },
  { collection: 'guardians', _id: false }
);

GuardianSchema.pre('save', function (next: Function) {
  console.log('saving...');
  next();
});

