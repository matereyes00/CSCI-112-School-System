import { BaseModel } from "src/shared/base.model";

interface QPI {
  studentID: string;
  studentYear: string;
  QPI: number;
  semester: string;
}

interface QPIMongoModel extends QPI, BaseModel {}

export {
  QPI,
  QPIMongoModel
}