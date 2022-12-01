import { BaseModel } from "src/shared/base.model";

interface HoldOrders {
  studentID: number;
  orderType: string;
  dateDue: Date;
}

interface HoldOrdersMongoModel extends HoldOrders, BaseModel {}

export {
  HoldOrders,
  HoldOrdersMongoModel
}