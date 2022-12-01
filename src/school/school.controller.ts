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

}