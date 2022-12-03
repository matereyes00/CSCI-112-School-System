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
  
  public async StudentsWithHoldOrder() {
    const aggregate = await this.studentModel.aggregate([ 
      { 
        $match : { hasHoldOrder: true } 
      },
      {
        $count: 'Students with hold orders'
      }
    ])
    return aggregate[0];
  }

  public async DepartmentWithMostStudents() {
    const aggregate = await this.studentModel.aggregate([
      {
        $group: {
          _id: '$department',
          count: { $sum: 1 }
        }
      },
      {
        $sort: { count: -1 }
      },
      {
        $limit: 1
      }
    ])
    return aggregate[0];
  }
}