import { Controller, Get, HttpException, HttpStatus, Body, Put } from '@nestjs/common';
import { SupportService } from './support.service';
import { Support } from './support.schema';

@Controller('support')
export class SupportController {
  constructor(private readonly supportService: SupportService) {}

  // Endpoint to fetch the entire support data
  @Get()
  async getSupportData() {
    try {
      console.log('Fetching support data...');
      const supportData = await this.supportService.getSupportData();

      if (!supportData) {
        throw new HttpException('Support data not found', HttpStatus.NOT_FOUND);
      }

      console.log('Support data fetched successfully:', supportData);
      return supportData;
    } catch (error) {
      console.error('Error fetching support data:', error.message);
      throw new HttpException('Failed to fetch support data', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  // Endpoint to upsert support data
  @Put()
  async upsertSupportData(@Body() supportData: Partial<Support>) {
    try {
      console.log('Upserting support data...');
      const updatedSupportData = await this.supportService.upsertSupportData(supportData);
      
      console.log('Support data upserted successfully:', updatedSupportData);
      return updatedSupportData;
    } catch (error) {
      console.error('Error upserting support data:', error.message);
      throw new HttpException('Failed to upsert support data', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
