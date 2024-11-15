import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Support, SupportDocument } from './support.schema';

@Injectable()
export class SupportService {
  constructor(@InjectModel(Support.name) private supportModel: Model<SupportDocument>) {}

  async getSupportData(): Promise<Support> {
    try {
      const result = await this.supportModel.findOne({}); 
      console.log('Fetched support data:', result);
      return result;
    } catch (error) {
      console.error('Error fetching support data:', error.message);
      throw error;
    }
  }

  // Create or update support data
  async upsertSupportData(supportData: Partial<Support>): Promise<Support> {
    try {
      const result = await this.supportModel.findOneAndUpdate(
        {},
        supportData,
        { new: true, upsert: true } 
      );
      console.log('Upserted support data:', result);
      return result;
    } catch (error) {
      console.error('Error upserting support data:', error.message);
      throw error;
    }
  }

  // Delete all support data (if needed)
  async deleteSupportData(): Promise<{ deletedCount?: number }> {
    try {
      const result = await this.supportModel.deleteMany({});
      console.log('Deleted support data:', result);
      return result;
    } catch (error) {
      console.error('Error deleting support data:', error.message);
      throw error;
    }
  }
}
