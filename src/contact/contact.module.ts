import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Contact, ContactSchema } from './contact.schema';
import { ContactService } from './contact.service';
import { ContactController } from './contact.controller';

@Module({
  imports: [MongooseModule.forFeature([{ name: Contact.name, schema: ContactSchema }])],
  providers: [ContactService],
  controllers: [ContactController], // Register ContactController here
  exports: [ContactService],
})
export class ContactModule {}
