import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type SupportDocument = Support & Document;

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

export const NavbarSchema = SchemaFactory.createForClass(Navbar);

@Schema()
export class Breadcrumb {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  link: string;
}

export const BreadcrumbSchema = SchemaFactory.createForClass(Breadcrumb);

@Schema()
export class HeroSection {
  @Prop({ required: true })
  title: string;

  @Prop({ type: [BreadcrumbSchema], default: [] })
  breadcrumbs: Breadcrumb[];
}

export const HeroSectionSchema = SchemaFactory.createForClass(HeroSection);

@Schema()
export class HelpButton {
  @Prop({ required: true })
  text: string;

  @Prop({ required: true })
  link: string;
}

export const HelpButtonSchema = SchemaFactory.createForClass(HelpButton);

@Schema()
export class Help {
  @Prop({ required: true })
  icon: string;

  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  description: string;

  @Prop({ type: HelpButtonSchema })
  button: HelpButton;
}

export const HelpSchema = SchemaFactory.createForClass(Help);

@Schema()
export class KindOfHelp {
  @Prop({ required: true })
  img: string;

  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  about: string;

  @Prop({ required: true })
  buttonText: string;
}

export const KindOfHelpSchema = SchemaFactory.createForClass(KindOfHelp);

@Schema()
export class HelpKindData {
  @Prop({ required: true })
  heading: string;

  @Prop({ required: true })
  paragraph: string;

  @Prop({ type: [KindOfHelpSchema], default: [] })
  Kindofhelp: KindOfHelp[];
}

export const HelpKindDataSchema = SchemaFactory.createForClass(HelpKindData);

@Schema()
export class WhatsApp {
  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  description: string;

  @Prop({ required: true })
  link: string;

  @Prop({ required: true })
  buttonText: string;
}

export const WhatsAppSchema = SchemaFactory.createForClass(WhatsApp);

@Schema({ timestamps: true })
export class Support {
  @Prop({ type: NavbarSchema })
  navbar: Navbar;

  @Prop({ type: HeroSectionSchema })
  heroSection: HeroSection;

  @Prop({ type: [HelpSchema], default: [] })
  help: Help[];

  @Prop({ type: HelpKindDataSchema })
  helpKindData: HelpKindData;

  @Prop({ type: WhatsAppSchema })
  whatsapp: WhatsApp;
}

export const SupportSchema = SchemaFactory.createForClass(Support);
