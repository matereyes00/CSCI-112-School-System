import * as mongoose from 'mongoose';
import { ParentMongoModel } from './parents.model';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { LoggerService } from 'src/shared/logger.service';
import { BaseRepository } from 'src/shared/base.repository';

@Injectable()
export class ParentRepository extends BaseRepository<ParentMongoModel> {
  constructor(
    @InjectModel('Parent')
    private readonly parentModel: mongoose.Model<ParentMongoModel>,
    private readonly log: LoggerService,
  ) {
    super(parentModel, log);
  }
  
}