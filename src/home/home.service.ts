import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Home } from './home.schema'; // Adjust based on your schema file

@Injectable()
export class HomeService {
  constructor(@InjectModel('Home') private homeModel: Model<Home>) {}

  // Fetch the entire home data (all sections)
  async getHomeData(): Promise<Home> {
    try {
      const result = await this.homeModel.findOne({}); // Assuming only one document in 'Home'
      console.log('Fetched home data:', result);
      return result;
    } catch (error) {
      console.error('Error fetching home data:', error.message);
      throw error;
    }
  }

  // Create or update home data
  async upsertHomeData(homeData: Partial<Home>): Promise<Home> {
    try {

  
     
      // Perform the update without the _id field
      const result = await this.homeModel.findOneAndUpdate(
        {},

        homeData, // Only pass the data to be updated
        { new: true, upsert: true } // Create if the document does not exist
      );
  
      console.log('Upserted home data:', result);
      return result;
    } catch (error) {
      console.error('Error upserting home data:', error.message);
      throw error;
    }
  }
  

  // Delete all home data (if needed)
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
