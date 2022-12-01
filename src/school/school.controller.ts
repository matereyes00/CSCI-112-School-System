import { Controller, Injectable, Post } from "@nestjs/common";
import { SchoolService } from "./school.service";

@Injectable()
@Controller('school')

export class SchoolController {
  constructor (
    private readonly schoolService: SchoolService
  ) {}

  @Post('/insert/students')
  async InsertStudents() {
    await this.schoolService.InsertStudents();
  }

  @Post('/insert/parents')
  async InsertParents() {
    await this.schoolService.InsertParents();
  }

  @Post('/insert/holdOrders')
  async InsertHoldOrders() {
    await this.schoolService.InsertHoldOrders();
  }

  @Post('/insert/teachers')
  async InsertTeachers() {
    await this.schoolService.InsertTeachers();
  }

  @Post('/insert/courses')
  async InsertCourses() {
    await this.schoolService.InsertCourses();
  }

  @Post('/insert/qpi')
  async InsertQPIs() {
    await this.schoolService.InsertQPI();
  }
}