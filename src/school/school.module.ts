import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { LoggerService } from "src/shared/logger.service";
import { SharedModule } from "src/shared/shared.module";
import { CourseRepository } from "./collections/courses/course.repository";
import { CourseSchema } from "./collections/courses/course.schema";
import { GuardianRepository } from "./collections/guardians/guardian.repository";
import { GuardianSchema } from "./collections/guardians/guardian.schema";
import { HoldOrdersRepository } from "./collections/holdOrders/holdOrders.repository";
import { HoldOrdersSchema } from "./collections/holdOrders/holdOrders.schema";
import { ParentRepository } from "./collections/parents/parents.repository";
import { ParentSchema } from "./collections/parents/parents.schema";
import { QPIRepository } from "./collections/qpi/qpi.repository";
import { QPISchema } from "./collections/qpi/qpi.schema";
import { StudentRepository } from "./collections/student/student.repository";
import { StudentSchema } from "./collections/student/student.schema";
import { TeacherRepository } from "./collections/teachers/teacher.repository";
import { TeacherSchema } from "./collections/teachers/teacher.schema";
import { QueriesService } from "./queries.service";
import { SchoolController } from "./school.controller";
import { SchoolService } from "./school.service";

@Module({
  imports: [
    SharedModule,
    MongooseModule.forFeature([
      { name: 'Parent', schema: ParentSchema },
      { name: 'Student', schema: StudentSchema },
      { name: 'HoldOrders', schema: HoldOrdersSchema },
      { name: 'Teacher', schema: TeacherSchema },
      { name: 'Course', schema: CourseSchema },
      { name: 'QPI', schema: QPISchema },
      { name: 'Guardian', schema: GuardianSchema }
    ])
  ],
  controllers: [SchoolController],
  providers: [
    SchoolService,
    ParentRepository,
    StudentRepository,
    HoldOrdersRepository,
    TeacherRepository,
    CourseRepository,
    QPIRepository,
    GuardianRepository,
    LoggerService,
    QueriesService
  ]
})
export class SchoolModule {}