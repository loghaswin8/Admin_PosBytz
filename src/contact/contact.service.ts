import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Contact } from './contact.schema';

@Injectable()
export class ContactService {
  constructor(@InjectModel(Contact.name) private contactModel: Model<Contact>) {}

  async getContactData(): Promise<Contact> {
    try {
      const result = await this.contactModel.findOne({});
      console.log('Fetched contact data:', result);
      return result;
    } catch (error) {
      console.error('Error fetching contact data:', error.message);
      throw error;
    }
  }

  async upsertContactData(contactData: Partial<Contact>): Promise<Contact> {
    try {
      const result = await this.contactModel.findOneAndUpdate(
        {},
        contactData,
        { new: true, upsert: true } 
      );
      console.log('Upserted contact data:', result);
      return result;
    } catch (error) {
      console.error('Error upserting contact data:', error.message);
      throw error;
    }
  }

  async deleteContactData(): Promise<{ deletedCount?: number }> {
    try {
      const result = await this.contactModel.deleteMany({});
      console.log('Deleted contact data:', result);
      return result;
    } catch (error) {
      console.error('Error deleting contact data:', error.message);
      throw error;
    }
  }
}
