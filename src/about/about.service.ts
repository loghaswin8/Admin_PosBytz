import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { About } from './about.schema';

@Injectable()
export class AboutService {
  constructor(@InjectModel(About.name) private aboutModel: Model<About>) {}

  // Fetch the entire about data (all sections)
  async getAboutData(): Promise<About> {
    try {
      const result = await this.aboutModel.findOne({}); // Assuming only one document in 'About'
      console.log('Fetched about data:', result);
      return result;
    } catch (error) {
      console.error('Error fetching about data:', error.message);
      throw error;
    }
  }

  // Optionally, add more methods for other CRUD operations

  // Create or update about data
  async upsertAboutData(aboutData: Partial<About>): Promise<About> {
    try {
      const result = await this.aboutModel.findOneAndUpdate(
        {},
        aboutData,
        { new: true, upsert: true } // Create a new document if none exists
      );
      console.log('Upserted about data:', result);
      return result;
    } catch (error) {
      console.error('Error upserting about data:', error.message);
      throw error;
    }
  }

  // Delete all about data (if needed)
  async deleteAboutData(): Promise<{ deletedCount?: number }> {
    try {
      const result = await this.aboutModel.deleteMany({});
      console.log('Deleted about data:', result);
      return result;
    } catch (error) {
      console.error('Error deleting about data:', error.message);
      throw error;
    }
  }
}
