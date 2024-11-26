import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { About } from './about.schema';

@Injectable()
export class AboutService {
  constructor(@InjectModel(About.name) private aboutModel: Model<About>) {}

  async getAboutData(): Promise<About> {
    try {
      const result = await this.aboutModel.findOne({});
      console.log('Fetched about data:', result);
      return result;
    } catch (error) {
      console.error('Error fetching about data:', error.message);
      throw error;
    }
  }

  async upsertAboutData(aboutData: Partial<About>): Promise<About> {
    try {
      const result = await this.aboutModel.findOneAndUpdate(
        {},
        aboutData,
        { new: true, upsert: true } 
      );
      console.log('Upserted about data:', result);
      return result;
    } catch (error) {
      console.error('Error upserting about data:', error.message);
      throw error;
    }
  }

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
