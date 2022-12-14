import * as mongoose from 'mongoose';
import { QPIMongoModel } from './qpi.model';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { LoggerService } from 'src/shared/logger.service';
import { BaseRepository } from 'src/shared/base.repository';

@Injectable()
export class QPIRepository extends BaseRepository<QPIMongoModel> {
  constructor(
    @InjectModel('QPI')
    private readonly qpiModel: mongoose.Model<QPIMongoModel>,
    private readonly log: LoggerService,
  ) {
    super(qpiModel, log);
  }
  
  async QPIGreaterThan() {
    const aggregate = await this.qpiModel.aggregate([
      {
        $match: {
          $and: [
            { studentYear: 'Sophomore' },
            { semester: '2nd Semester' },
            { QPI: { $gt: 3.3 } }
          ]
        }
      },
      {
        $project: {
          _id: 0,
          __v: 0
        }
      }
    ])
    return aggregate;
  }

  async AwardStudents() {
    const aggregate = await this.qpiModel.aggregate([
      // 
      {
        $group: {
          _id: '$studentID',
          avgQPI: { $avg: '$QPI' }
        }
      },
      {
        $match: { avgQPI: {$gt: 3.5} }
      },
      {
        $lookup: {
          from: 'students',
          as: 'studentInfo',
          foreignField: 'studentID',
          localField: '_id',
          pipeline: [
            {
              $project: {
                _id: 0,
                studentID: 1,
                primaryEmail: 1,
                secondaryEmail: 1,
                studentName: 1
              }
            }
          ]
        }
      },
      {
        $addFields: {
          studentInfo: {
            $first: '$studentInfo'
          }
        }
      }
    ])
    return aggregate;
  }
}