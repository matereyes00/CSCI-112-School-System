import { BaseModel } from "src/shared/base.model";

interface Student {
  studentID: number;
  studentName?: string;
  studentYear?: string;
  courseName?: string;
  department?: string;
  // address?: {
  //   country: string;
  //   city: string;
  //   streetName: string;
  //   zipCode: string;
  // }
  birthday?: string;
  primaryEmail?: string;
  secondaryEmail?: string;
  landline?: string;
  contactNo?: string;
  unitsTaken?: string;
  hasHoldOrder?: boolean;
  hasAnsweredAISISEvals?: boolean;
}

interface StudentMongoModel extends Student, BaseModel {}

export {
  Student,
  StudentMongoModel
}