import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Intro {
  @Prop({ required: true })
  heading: string;

  @Prop({ required: true })
  paragraph: string;

  @Prop({ required: true })
  buttonText: string;

  @Prop({
    type: Object,
    required: true,
  })
  image: {
    src: string;
    alt: string;
  };
}

@Schema()
export class Feature {
  @Prop({ required: true })
  id: string;

  @Prop({ required: true })
  name: string;

  @Prop({ type: [String], required: true })
  text: string[];

  @Prop({ required: true })
  color: string;

  @Prop({ required: true })
  buttonImgSrc: string;

  @Prop({ required: true })
  contentImgSrc: string;
}

@Schema()
export class VideoSection {
  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  subtitle: string;

  @Prop({ required: true })
  description: string;

  @Prop({ required: true })
  videoUrl: string;
}

@Schema()
export class Reason {
  @Prop({ required: true })
  id: number;

  @Prop({ required: true })
  image: string;

  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  subtitle: string;

  @Prop({ required: true })
  description: string;

  @Prop({ required: true })
  borderColor: string;
}

@Schema()
export class ReasonsSection {
  @Prop({ required: true })
  mainTitle: string;

  @Prop({ required: true })
  subtitle: string;

  @Prop({ required: true })
  highlight: string;

  @Prop({ type: [Reason], required: true })
  reasons: Reason[];
}

@Schema()
export class Logo {
  @Prop({ required: true })
  src: string;

  @Prop({ required: true })
  alt: string;
}

@Schema()
export class Integrations {
  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  description: string;

  @Prop({ type: [Logo], required: true })
  logos: Logo[];
}

@Schema()
export class BrandRow {
  @Prop({ required: true })
  image: string;
}

@Schema()
export class Brands {
  @Prop({ type: [BrandRow], required: true })
  row1: BrandRow[];

  @Prop({ type: [BrandRow], required: true })
  row2: BrandRow[];

  @Prop({ type: [BrandRow], required: true })
  row3: BrandRow[];
}

@Schema()
export class Tagline {
  @Prop({ required: true })
  title1: string;

  @Prop({ required: true })
  title2: string;

  @Prop({ required: true })
  description: string;

  @Prop({ required: true })
  buttonText: string;
}

@Schema()
export class Testimonial {
  @Prop({ required: true })
  img: string;

  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  text: string;
}

@Schema()
export class ErpSection {
  @Prop({ required: true })
  heading: string;

  @Prop({ required: true })
  buttonText: string;

  @Prop({ required: true })
  buttonLink: string;

  @Prop({ required: true })
  imageSrc: string;

  @Prop({ required: true })
  imageAlt: string;
}

@Schema()
export class Faq {
  @Prop({ required: true })
  question: string;

  @Prop({ required: true })
  answer: string;
}

@Schema()
export class BusinessSection {
  @Prop({ required: true })
  heading: string;

  @Prop({ required: true })
  buttonText: string;
}

@Schema({ timestamps: true })
export class Home extends Document {
  @Prop({ type: Intro, required: true })
  intro: Intro;

  @Prop({ type: [Feature], required: true })
  features: Feature[];

  @Prop({ type: VideoSection, required: true })
  videoSection: VideoSection;

  @Prop({ type: ReasonsSection, required: true })
  reasonsSection: ReasonsSection;

  @Prop({ type: Integrations, required: true })
  integrations: Integrations;

  @Prop({ type: Brands, required: true })
  brands: Brands;

  @Prop({ type: Tagline, required: true })
  tagline: Tagline;

  @Prop({ type: [Testimonial], required: true })
  testimonials: Testimonial[];

  @Prop({ type: ErpSection, required: true })
  erpSection: ErpSection;

  @Prop({ type: [Faq], required: true })
  faqData: Faq[];

  @Prop({ type: BusinessSection, required: true })
  businessSection: BusinessSection;
}

export const HomeSchema = SchemaFactory.createForClass(Home);
