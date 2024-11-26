import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Breadcrumb {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  link: string;
}

@Schema()
export class HeroSection {
  @Prop({ required: true })
  title: string;

  @Prop({ type: [Breadcrumb], default: [] })
  breadcrumbs: Breadcrumb[];
}

@Schema()
export class Navbar {
  @Prop({ required: true })
  backgroundColorDefault: string;

  @Prop({ required: true })
  backgroundColorScrolled: string;

  @Prop({ required: true })
  linkColorDefault: string;

  @Prop({ required: true })
  linkColorScrolled: string;
}

@Schema()
export class Header {
  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  description: string;
}

@Schema()
export class FormPlaceholders {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  email: string;

  @Prop({ required: true })
  subject: string;

  @Prop({ required: true })
  message: string;

  @Prop({ required: true })
  phone: string;
}

@Schema({ timestamps: true })
export class Contact extends Document {
  @Prop({ type: Navbar, required: true })
  navbar: Navbar;

  @Prop({ type: HeroSection, required: true })
  heroSection: HeroSection;

  @Prop({ type: Header, required: true })
  header: Header;

  @Prop({ type: FormPlaceholders, required: true })
  formPlaceholders: FormPlaceholders;

  @Prop({ required: true })
  submitButton: string;
}

export const ContactSchema = SchemaFactory.createForClass(Contact);
