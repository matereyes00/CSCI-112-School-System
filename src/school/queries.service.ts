import { Injectable } from "@nestjs/common";
import { Parent } from "./collections/parents/parents.model";
import { Student, StudentMongoModel } from "./collections/student/student.model";
import { ParentRepository } from "./collections/parents/parents.repository";
import { StudentRepository } from "./collections/student/student.repository";
import axios from 'axios';
import { HoldOrders } from "./collections/holdOrders/holdOrders.model";
import { HoldOrdersRepository } from "./collections/holdOrders/holdOrders.repository";
import { Teacher } from "./collections/teachers/teacher.model";
import { TeacherRepository } from "./collections/teachers/teacher.repository";
import { Course } from "./collections/courses/course.model";
import { CourseRepository } from "./collections/courses/course.repository";
import { QPI } from "./collections/qpi/qpi.model";
import { QPIRepository } from "./collections/qpi/qpi.repository";

@Injectable()
export class QueriesService {
  constructor(
    private readonly parentRepository: ParentRepository,
    private readonly studentRepository: StudentRepository,
    private readonly holdOrdersRepository: HoldOrdersRepository,
    private readonly teachersRepository: TeacherRepository,
    private readonly courseRepository: CourseRepository,
    private readonly qpiRepository: QPIRepository
  ) {}

  // C
  public NumberOfStudentsWithHoldOrder() {
    return this.studentRepository.StudentsWithHoldOrder();
  }

  // D
  public MostUnitsTakenAndQuotaCourse() {
    return this.courseRepository.MostUnitsTakenAndQuotaCourse();
  }

  // E
  public TeachingOverAYearByDepartment(department: string) {
    return this.teachersRepository.TeachingOverAYearByDepartment(department);
  }

  // F
  public DepartmentWithMostStudents() {
    return this.studentRepository.DepartmentWithMostStudents();
  }

  // G
  public QPIGreaterThan() {
    return this.qpiRepository.QPIGreaterThan();
  }

  // H
  public TeachersWithCourseInfo() {
    return this.teachersRepository.TeacherWithCourseInfo();
  }

  // I
  public AwardStudents() {
    return this.qpiRepository.AwardStudents();
  }

}