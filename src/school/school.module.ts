import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { LoggerService } from "src/shared/logger.service";
import { SharedModule } from "src/shared/shared.module";
import { ParentRepository } from "./collections/parents/parents.repository";
import { ParentSchema } from "./collections/parents/parents.schema";
import { StudentRepository } from "./collections/student/student.repository";
import { StudentSchema } from "./collections/student/student.schema";
import { SchoolController } from "./school.controller";
import { SchoolService } from "./school.service";

@Module({
  imports: [
    SharedModule,
    MongooseModule.forFeature([
      { name: 'Parent', schema: ParentSchema },
      { name: 'Student', schema: StudentSchema }
    ])
  ],
  controllers: [SchoolController],
  providers: [
    SchoolService,
    ParentRepository,
    StudentRepository,
    LoggerService
  ]
})
export class SchoolModule {}