import * as mongoose from 'mongoose';
import { HoldOrdersMongoModel } from './holdOrders.model';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { LoggerService } from 'src/shared/logger.service';
import { BaseRepository } from 'src/shared/base.repository';

@Injectable()
export class HoldOrdersRepository extends BaseRepository<HoldOrdersMongoModel> {
  constructor(
    @InjectModel('HoldOrders')
    private readonly holdOrdersModel: mongoose.Model<HoldOrdersMongoModel>,
    private readonly log: LoggerService,
  ) {
    super(holdOrdersModel, log);
  }
  
}