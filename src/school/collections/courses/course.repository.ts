import * as mongoose from 'mongoose';
import { CourseMongoModel } from './course.model';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { LoggerService } from 'src/shared/logger.service';
import { BaseRepository } from 'src/shared/base.repository';

@Injectable()
export class CourseRepository extends BaseRepository<CourseMongoModel> {
  constructor(
    @InjectModel('Course')
    private readonly courseModel: mongoose.Model<CourseMongoModel>,
    private readonly log: LoggerService,
  ) {
    super(courseModel, log);
  }
  
}