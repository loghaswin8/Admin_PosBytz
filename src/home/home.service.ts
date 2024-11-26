import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Home } from './home.schema'; 

@Injectable()
export class HomeService {
  constructor(@InjectModel('Home') private homeModel: Model<Home>) {}

  async getHomeData(): Promise<Home> {
    try {
      const result = await this.homeModel.findOne({}); 
      console.log('Fetched home data');
      return result;
    } catch (error) {
      console.error('Error fetching home data:', error.message);
      throw error;
    }
  }

  async upsertHomeData(homeData: Partial<Home>): Promise<Home> {
    try {

      const result = await this.homeModel.findOneAndUpdate(
        {},

        homeData, 
        { new: true, upsert: true } 
      );
  
      console.log('Upserted home data');
      return result;
    } catch (error) {
      console.error('Error upserting home data:', error.message);
      throw error;
    }
  }

  async deleteHomeData(): Promise<{ deletedCount?: number }> {
    try {
      const result = await this.homeModel.deleteMany({});
      console.log('Deleted home data:', result);
      return result;
    } catch (error) {
      console.error('Error deleting home data:', error.message);
      throw error;
    }
  }
}
