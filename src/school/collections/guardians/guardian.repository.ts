import * as mongoose from 'mongoose';
import { GuardianMongoModel } from './guardian.model';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { LoggerService } from 'src/shared/logger.service';
import { BaseRepository } from 'src/shared/base.repository';

@Injectable()
export class GuardianRepository extends BaseRepository<GuardianMongoModel> {
  constructor(
    @InjectModel('Guardian')
    private readonly guardianModel: mongoose.Model<GuardianMongoModel>,
    private readonly log: LoggerService,
  ) {
    super(guardianModel, log);
  }
  
}