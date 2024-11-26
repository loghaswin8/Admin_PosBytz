import {
  Controller,
  Get,
  Put,
  Body,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { AboutService } from './about.service';
import { About } from './about.schema';

@Controller('about')
export class AboutController {
  constructor(private readonly aboutService: AboutService) {}

  @Get()
  async getAboutData() {
    try {
      console.log('Fetching about data...');
      const aboutData = await this.aboutService.getAboutData();

      if (!aboutData) {
        throw new HttpException('About data not found', HttpStatus.NOT_FOUND);
      }

      console.log('About data fetched successfully:', aboutData);
      return aboutData;
    } catch (error) {
      console.error('Error fetching about data:', error.message);
      throw new HttpException(
        'Failed to fetch about data',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Put()
  async upsertAboutData(@Body() aboutData: Partial<About>) {
    try {
      console.log('Upserting about data...', aboutData);
      const updatedData = await this.aboutService.upsertAboutData(aboutData);
      console.log('About data upserted successfully:', updatedData);
      return updatedData;
    } catch (error) {
      console.error('Error upserting about data:', error.message);
      throw new HttpException(
        'Failed to upsert about data',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
