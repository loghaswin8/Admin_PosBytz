import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Contact } from './contact.schema';

@Injectable()
export class ContactService {
  constructor(@InjectModel(Contact.name) private contactModel: Model<Contact>) {}

  // Fetch the entire contact data (all sections)
  async getContactData(): Promise<Contact> {
    try {
      const result = await this.contactModel.findOne({}); // Assuming only one document in 'Contact'
      console.log('Fetched contact data:', result);
      return result;
    } catch (error) {
      console.error('Error fetching contact data:', error.message);
      throw error;
    }
  }

  // Optionally, add more methods for other CRUD operations

  // Create or update contact data
  async upsertContactData(contactData: Partial<Contact>): Promise<Contact> {
    try {
      const result = await this.contactModel.findOneAndUpdate(
        {},
        contactData,
        { new: true, upsert: true } // Create a new document if none exists
      );
      console.log('Upserted contact data:', result);
      return result;
    } catch (error) {
      console.error('Error upserting contact data:', error.message);
      throw error;
    }
  }

  // Delete all contact data (if needed)
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
