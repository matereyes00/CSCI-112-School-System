import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { LoggerService } from "src/shared/logger.service";
import { SharedModule } from "src/shared/shared.module";
import { HoldOrdersRepository } from "./collections/holdOrders/holdOrders.repository";
import { HoldOrdersSchema } from "./collections/holdOrders/holdOrders.schema";
import { ParentRepository } from "./collections/parents/parents.repository";
import { ParentSchema } from "./collections/parents/parents.schema";
import { StudentRepository } from "./collections/student/student.repository";
import { StudentSchema } from "./collections/student/student.schema";
import { TeacherRepository } from "./collections/teachers/teacher.repository";
import { TeacherSchema } from "./collections/teachers/teacher.schema";
import { SchoolController } from "./school.controller";
import { SchoolService } from "./school.service";

@Module({
  imports: [
    SharedModule,
    MongooseModule.forFeature([
      { name: 'Parent', schema: ParentSchema },
      { name: 'Student', schema: StudentSchema },
      { name: 'HoldOrders', schema: HoldOrdersSchema },
      { name: 'Teacher', schema: TeacherSchema }
    ])
  ],
  controllers: [SchoolController],
  providers: [
    SchoolService,
    ParentRepository,
    StudentRepository,
    HoldOrdersRepository,
    TeacherRepository,
    LoggerService
  ]
})
export class SchoolModule {}