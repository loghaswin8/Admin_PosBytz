import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Career, CareerSchema } from './career.schema';
import { CareerService } from './career.service';
import { CareerController } from './career.controller';

@Module({
  imports: [MongooseModule.forFeature([{ name: Career.name, schema: CareerSchema }])],
  providers: [CareerService],
  controllers: [CareerController], // Register CareerController here
  exports: [CareerService],
})
export class CareerModule {}
