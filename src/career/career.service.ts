import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Career, CareerDocument } from './career.schema';

@Injectable()
export class CareerService {
  constructor(@InjectModel(Career.name) private careerModel: Model<CareerDocument>) {}

  // Fetch the entire career data (all sections)
  async getCareerData(): Promise<Career> {
    try {
      const result = await this.careerModel.findOne({}); // Assuming only one document in 'Career'
      console.log('Fetched career data:', result);
      return result;
    } catch (error) {
      console.error('Error fetching career data:', error.message);
      throw error;
    }
  }

  // Create or update career data
  async upsertCareerData(careerData: Partial<Career>): Promise<Career> {
    try {
      const result = await this.careerModel.findOneAndUpdate(
        {},
        careerData,
        { new: true, upsert: true } // Create a new document if none exists
      );
      console.log('Upserted career data:', result);
      return result;
    } catch (error) {
      console.error('Error upserting career data:', error.message);
      throw error;
    }
  }

  // Delete all career data (if needed)
  async deleteCareerData(): Promise<{ deletedCount?: number }> {
    try {
      const result = await this.careerModel.deleteMany({});
      console.log('Deleted career data:', result);
      return result;
    } catch (error) {
      console.error('Error deleting career data:', error.message);
      throw error;
    }
  }
}
