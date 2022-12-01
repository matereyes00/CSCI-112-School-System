import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { SchoolModule } from './school/school.module';
import { SharedModule } from './shared/shared.module';

@Module({
  imports: [
    SharedModule,
    SchoolModule,
    MongooseModule.forRoot('mongodb://localhost:27017/SCHOOL_DATABASE', {})
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
