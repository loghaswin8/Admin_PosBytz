import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Schema as MongooseSchema } from 'mongoose';

@Schema()
class Breadcrumb {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  link: string;
}

@Schema()
class HeroSection {
  @Prop({ required: true })
  title: string;

  @Prop({ type: [MongooseSchema.Types.Mixed], required: true })
  breadcrumbs: Breadcrumb[];
}

@Schema()
class Logo {
  @Prop({ required: true })
  src: string;

  @Prop({ required: true })
  alt: string;
}

@Schema()
class Navbar {
  @Prop({ required: true })
  backgroundColorDefault: string;

  @Prop({ required: true })
  backgroundColorScrolled: string;

  @Prop({ required: true })
  linkColorDefault: string;

  @Prop({ required: true })
  linkColorScrolled: string;

  @Prop({ type: MongooseSchema.Types.Mixed, required: true })
  mainLogo: Logo;

  @Prop({ type: MongooseSchema.Types.Mixed, required: true })
  stickyLogo: Logo;
}

@Schema()
class AboutSectionItem {
  @Prop({ required: true })
  title: string;

  @Prop({ type: [String], required: true })
  description: string[];
}

@Schema()
class Card {
  @Prop({ required: true })
  icon: string;

  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  description: string;

  @Prop({ required: true })
  link: string;
}

@Schema()
class HowToReach {
  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  description: string;

  @Prop({ type: [MongooseSchema.Types.Mixed], required: true })
  cards: Card[];
}

@Schema({ timestamps: true })
export class About extends Document {
  @Prop({ type: MongooseSchema.Types.Mixed, required: true })
  heroSection: HeroSection;

  @Prop({ type: MongooseSchema.Types.Mixed, required: true })
  navbar: Navbar;

  @Prop({ type: [MongooseSchema.Types.Mixed], required: true })
  aboutSection: AboutSectionItem[];

  @Prop({ type: MongooseSchema.Types.Mixed, required: true })
  logos: {
    posBytz: Logo;
    bytize: Logo;
  };

  @Prop({ required: true })
  productText: string;

  @Prop({ type: MongooseSchema.Types.Mixed, required: true })
  howToReach: HowToReach;
}

export const AboutSchema = SchemaFactory.createForClass(About);
