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
  
  public async TeachingOverAYearByDepartment(department: string) {
    const aggregate = await this.teacherModel.aggregate([
      {
       $match: {
        $and: [
          { department: department },
          { monthsEmployed: {$gt: 12} }
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

  public async TeacherWithCourseInfo() {
    const aggregate = await this.teacherModel.aggregate([
      {
        $lookup: {
          from: 'students',
          as: 'totalStudents',
          pipeline: [
            {
              $group: {
                _id: "$courseName",
                count: { $sum: 1 }
              }
            }
          ]
        }
      },
      {
        $lookup: {
          from: 'courses',
          as: 'coursesTaughtInformation',
          let: {
            coursesTaught: '$coursesTaught',
            totalStudents: '$totalStudents'
          },
          pipeline: [
            {
              $match: {
                $expr: {
                  $in: ['$courseName', '$$coursesTaught']
                }
              }
            },
            {
              $addFields: {
                totalStudent: {
                  $filter: {
                    input: '$$totalStudents',
                    as: "students",
                    cond: {
                      $eq: ['$$students._id', '$courseName']
                    }
                  }
                }
              }
            },
            {
              $unwind: '$totalStudent'
            },
            {
              $addFields: {
                studentsInCourse: '$totalStudent.count'
              }
            },
            {
              $project: {
                _id: 0,
                __v: 0,
                totalStudent: 0
              }
            }
          ]
        },
      },
      {
        $project: {
          _id: 0,
          __v: 0,
          // uncomment if want to show in DEMO
          totalStudents: 0
        }
      }
    ])
    return aggregate;
  }
}