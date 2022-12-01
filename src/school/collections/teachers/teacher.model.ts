import { BaseModel } from "src/shared/base.model";

interface Teacher {
  teacherID: string;
  teacherName: string;
  schoolEmail: string;
  department: string;
  contactNumber: string;
  coursesTaught: string[];
  monthsEmployed: number;
}

interface TeacherMongoModel extends Teacher, BaseModel {}

export {
  Teacher,
  TeacherMongoModel
}