import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { SharedModule } from './shared/shared.module';

@Module({
  imports: [
    SharedModule,
    MongooseModule.forRoot('mongodb://localhost:27017/SCHOOL_DATABASE', {})
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
