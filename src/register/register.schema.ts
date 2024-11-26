import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

// Define the interface for the document
export type RegisterDocument = User & Document;

@Schema({ timestamps: true }) // Automatically adds createdAt and updatedAt fields
export class User {
  @Prop({ required: true, minlength: 2 })
  name: string;

  @Prop({ required: true, unique: true, match: /.+\@.+\..+/ })
  email: string;

  @Prop({ required: true, minlength: 6 })
  password: string;
}

export interface User extends Document {
  name: string
  email: string;
  password: string;
}

export const RegisterSchema = SchemaFactory.createForClass(User);
