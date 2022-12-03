import { Controller, Get, Injectable, Param, Post, Query } from "@nestjs/common";
import { QueriesService } from "./queries.service";
import { SchoolService } from "./school.service";

@Injectable()
@Controller('school')

export class SchoolController {
  constructor (
    private readonly schoolService: SchoolService,
    private readonly queriesService: QueriesService
  ) {}

  // ALL INSERTS HERE
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

  @Post('insert/guardians')
  async InsertGuardians() {
    await this.schoolService.InsertGuardians();
  }

  @Post('insert/all') 
  async InsertAll() {
    await this.schoolService.InsertStudents();
    await this.schoolService.InsertParents();
    await this.schoolService.InsertHoldOrders();
    await this.schoolService.InsertTeachers();
    await this.schoolService.InsertCourses();
    await this.schoolService.InsertQPI();
    await this.schoolService.InsertGuardians();
  }

  // ALL QUERIES START HERE

  // C
  @Get('query/holdOrder')
  async NumberOfStudentsWithHoldOrder() {
    return this.queriesService.NumberOfStudentsWithHoldOrder()
  }

  // D
  @Get('query/heaviestCourse')
  async MostUnitsTakenAndQuotaCourse() {
    return this.queriesService.MostUnitsTakenAndQuotaCourse()
  }

  // E
  @Get('query/teachers/:department')
  async TeachingOverAYearByDept(@Param('department') department: string) {
    return this.queriesService.TeachingOverAYearByDepartment(department)
  }

  // F
  @Get('query/mostStudents')
  async DepartmentWithMostStudents() {
    return this.queriesService.DepartmentWithMostStudents();
  }

  // G
  @Get('query/getSummas')
  async QPIGreaterThan() {
    return this.queriesService.QPIGreaterThan();
  }

  // H
  @Get('query/getInfoOnTeachers')
  async TeachersWithCourseInfo() {
    return this.queriesService.TeachersWithCourseInfo()
  }

  // I
  @Get('query/congratsLetter')
  async AwardStudents() {
    return this.queriesService.AwardStudents()
  }
}