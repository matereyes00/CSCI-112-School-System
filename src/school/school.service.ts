import { Injectable } from "@nestjs/common";
import { Parent } from "./collections/parents/parents.model";
import { Student } from "./collections/student/student.model";
import { ParentRepository } from "./collections/parents/parents.repository";
import { StudentRepository } from "./collections/student/student.repository";

@Injectable()
export class SchoolService {
  constructor(
    private readonly parentRepository: ParentRepository,
    private readonly studentRepository: StudentRepository
  ) {}
}