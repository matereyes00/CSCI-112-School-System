import { Controller, Injectable } from "@nestjs/common";
import { SchoolService } from "./school.service";

@Injectable()
@Controller('school')

export class SchoolController {
  constructor (
    private readonly schoolService: SchoolService
  ) {}
}