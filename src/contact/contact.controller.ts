import { Controller, Get, Put, Body, HttpException, HttpStatus } from '@nestjs/common';
import { ContactService } from './contact.service';
import { Contact } from './contact.schema';

@Controller('contact')
export class ContactController {
  constructor(private readonly contactService: ContactService) {}

  @Get()
  async getContactData() {
    try {
      console.log('Fetching contact data...');
      const contactData = await this.contactService.getContactData();

      if (!contactData) {
        throw new HttpException('Contact data not found', HttpStatus.NOT_FOUND);
      }

      console.log('Contact data fetched successfully:', contactData);
      return contactData;
    } catch (error) {
      console.error('Error fetching contact data:', error.message);
      throw new HttpException('Failed to fetch contact data', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Put()
  async upsertContactData(@Body() contactData: Partial<Contact>) {
    try {
      console.log('Upserting contact data...', contactData);
      const result = await this.contactService.upsertContactData(contactData);

      console.log('Contact data upserted successfully:', result);
      return result;
    } catch (error) {
      console.error('Error upserting contact data:', error.message);
      throw new HttpException('Failed to upsert contact data', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
