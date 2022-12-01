import { BaseModel } from "src/shared/base.model";

interface Parent {
  parentName: string;
  relationship: string;
  studentID: number[];
  contactNumber: string;
  email: string;
}

interface ParentMongoModel extends Parent, BaseModel {}

export {
  Parent,
  ParentMongoModel
}