import { BaseModel } from "src/shared/base.model";

interface Guardian {
  guardianID: string;
  guardianName: string;
  studentID: string[];
  contactNumber: string;
  email: string;
}

interface GuardianMongoModel extends Guardian, BaseModel {}

export {
  Guardian,
  GuardianMongoModel
}