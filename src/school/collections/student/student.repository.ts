import * as mongoose from 'mongoose';
import { StudentMongoModel } from './student.model';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { LoggerService } from 'src/shared/logger.service';
import { BaseRepository } from 'src/shared/base.repository';

@Injectable()
export class StudentRepository extends BaseRepository<StudentMongoModel> {
  constructor(
    @InjectModel('Student')
    private readonly studentModel: mongoose.Model<StudentMongoModel>,
    private readonly log: LoggerService,
  ) {
    super(studentModel, log);
  }
  
}