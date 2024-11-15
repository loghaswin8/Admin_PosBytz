import { Controller, Get, Put, Body, HttpException, HttpStatus } from '@nestjs/common';
import { CareerService } from './career.service';
import { Career } from './career.schema';

@Controller('career')
export class CareerController {
  constructor(private readonly careerService: CareerService) {}

  // Endpoint to fetch the entire career data
  @Get()
  async getCareerData() {
    try {
      console.log('Fetching career data...');
      const careerData = await this.careerService.getCareerData();

      if (!careerData) {
        throw new HttpException('Career data not found', HttpStatus.NOT_FOUND);
      }

      console.log('Career data fetched successfully:', careerData);
      return careerData;
    } catch (error) {
      console.error('Error fetching career data:', error.message);
      throw new HttpException('Failed to fetch career data', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Put()
  async upsertCareerData(@Body() careerData: Partial<Career>) {
    try {
      console.log('Upserting career data...', careerData);
      const updatedData = await this.careerService.upsertCareerData(careerData);
      console.log('career data upserted successfully:', updatedData);
      return updatedData;
    } catch (error) {
      console.error('Error upserting career data:', error.message);
      throw new HttpException(
        'Failed to upsert career data',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
