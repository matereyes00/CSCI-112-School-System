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
  
}