import * as mongoose from 'mongoose';
import { TeacherMongoModel } from './teacher.model';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { LoggerService } from 'src/shared/logger.service';
import { BaseRepository } from 'src/shared/base.repository';

@Injectable()
export class TeacherRepository extends BaseRepository<TeacherMongoModel> {
  constructor(
    @InjectModel('Teacher')
    private readonly teacherModel: mongoose.Model<TeacherMongoModel>,
    private readonly log: LoggerService,
  ) {
    super(teacherModel, log);
  }
  
}