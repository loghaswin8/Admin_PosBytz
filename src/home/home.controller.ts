import { Controller, Get, Put, Body, HttpException, HttpStatus } from '@nestjs/common';
import { HomeService } from './home.service';
import { Home } from './home.schema'; // Adjust based on your actual schema import

@Controller('home')
export class HomeController {
  constructor(private readonly homeService: HomeService) {}

  // Endpoint to fetch the entire home data
  @Get()
  async getHomeData() {
    try {
      console.log('Fetching home data...');
      const homeData = await this.homeService.getHomeData();

      if (!homeData) {
        throw new HttpException('Home data not found', HttpStatus.NOT_FOUND);
      }

      console.log('Home data fetched successfully:', homeData);
      return homeData;
    } catch (error) {
      console.error('Error fetching home data:', error.message);
      throw new HttpException('Failed to fetch home data', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  // Endpoint to create or update home data (upsert)
  @Put()
  async upsertHomeData(@Body() homeData: Partial<Home>) {
    try {
      console.log('Upserting home data:', homeData);
      const updatedHomeData = await this.homeService.upsertHomeData(homeData);

      console.log('Home data upserted successfully:', updatedHomeData);
      return updatedHomeData;
    } catch (error) {
      console.error('Error upserting home data:', error.message);
      throw new HttpException('Failed to upsert home data', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
