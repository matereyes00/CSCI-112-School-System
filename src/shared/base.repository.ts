import { BaseModel } from "./base.model";
import { FilterQuery, Model, HydratedDocument, UpdateQuery, SortOrder } from "mongoose";
import { LoggerService } from "./logger.service";

export class BaseRepository<T extends BaseModel> {
  constructor(
    private readonly model: Model<T>,
    private readonly logger: LoggerService
  ) {}

  public async create(doc: object) {
    this.logger.debug('BaseRepo: Entity is being created...');
    const createdEntity = new this.model(doc);
    return await createdEntity.save();
  }

  public async createMany(doc: object[]) {
    this.logger.debug('BaseRepo: Entities are being created...');
    return await this.model.insertMany(doc);
  }

  // May not be used as much considering we find them based on some metadata
  public async findById(id: string): Promise<T> {
    this.logger.debug('BaseRepo: Entity is being found by id...');
    return this.model.findById(id);
  }

  public async findOne(filter: FilterQuery<T>): Promise<T> {
    this.logger.debug('BaseRepo: Entity is being found by metadata...');
    return this.model.findOne(filter);
  }

  public async findAll(): Promise<T[]> {
    this.logger.debug('BaseRepo: Entities are being found...');
    return await this.model.find();
  }

  public async find(filter: FilterQuery<T>): Promise<T[]> {
    this.logger.debug('BaseRepo: Entities are being found by metadata...');
    return await this.model.find(filter);
  }

  public async findAndSort(filter: FilterQuery<HydratedDocument<T>>, sortFilter: string | { [key: string]: SortOrder | {$meta: 'textScore'; } }): Promise<HydratedDocument<T>[]> {
    this.logger.debug('BaseRepo: Entities are being found by metadata + sorted');
    return await this.model.find(filter).sort(sortFilter);
  }

  public async updateOne(filter: FilterQuery<T>, updated: UpdateQuery<T>) {
    this.logger.debug('BaseRepo: Entity is being updated...');
    await this.model.updateOne(filter, updated);
  }

  public async updateMany(filter: FilterQuery<T>, updated: UpdateQuery<T>) {
    this.logger.debug('BaseRepo: Entities are being updated...');
    await this.model.updateMany(filter, updated)
  }

  public async deleteOne(filter: FilterQuery<T>) {
    this.logger.debug('BaseRepo: Entity is being deleted...')
    await this.model.deleteOne(filter);
  }

  public async deleteMany(filter: FilterQuery<T>) {
    this.logger.debug('BaseRepo: Entities are being deleted...')
    await this.model.deleteMany(filter);
  }

  public async distinct(fieldFilter: string, filter: FilterQuery<T>) {
    this.logger.debug('BaseRepo: Finding distinct values')
    return await this.model.distinct(fieldFilter, filter)
  }

}