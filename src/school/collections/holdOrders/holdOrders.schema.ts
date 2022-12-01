import * as mongoose from 'mongoose';

export const HoldOrdersSchema = new mongoose.Schema(
  {
    _id: {
      type: mongoose.Schema.Types.ObjectId,
      index: true,
      required: true,
      auto: true
    },
    orderType: {
      type: String,
      required: true
    },
    studentID: {
      type: String,
      required: true
    },
    dateDue: {
      type: String,
      required: true
    }
  },
  { collection: 'holdOrders', _id: false },
);

HoldOrdersSchema.pre('save', function (next: Function) {
  console.log('saving...');
  next();
});

