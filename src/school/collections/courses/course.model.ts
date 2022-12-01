import { BaseModel } from "src/shared/base.model";

interface Course {
  courseCode: string;
  courseName: string;
  courseFee: number;
  unitsNeeded: number;
  isQuotaCourse: boolean;
}

interface CourseMongoModel extends Course, BaseModel {}

export {
  Course,
  CourseMongoModel
}