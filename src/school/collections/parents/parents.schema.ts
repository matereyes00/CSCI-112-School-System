import * as mongoose from 'mongoose';

export const ParentSchema = new mongoose.Schema(
  {
    _id: {
      type: mongoose.Schema.Types.ObjectId,
      index: true,
      required: true,
      auto: true
    },
    parentName: {
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
    }
  },
  { collection: 'parents', _id: false },
);

ParentSchema.pre('save', function (next: Function) {
  console.log('saving...');
  next();
});

