import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type CareerDocument = Career & Document;

@Schema({ timestamps: true })
export class Career {
  @Prop({
    type: {
      title: String,
      headline: String,
      description: String,
      buttonText: String,
      imageUrl: String,
    },
  })
  topContent: {
    title: string;
    headline: string;
    description: string;
    buttonText: string;
    imageUrl: string;
  };

  @Prop([
    {
      img: String,
      title: String,
      about: String,
    },
  ])
  whereWeWork: Array<{
    img: string;
    title: string;
    about: string;
  }>;

  @Prop({
    type: {
      about: [String],
      icon: [
        {
          icon: String,
          Text: String,
        },
      ],
      image: String,
    },
  })
  coreValues: {
    about: string[];
    icon: Array<{
      icon: string;
      Text: string;
    }>;
    image: string;
  };

  @Prop({
    type: {
      about: [String],
      activities: [{ Activity: String }],
      image: String,
    },
  })
  worklife: {
    about: string[];
    activities: Array<{ Activity: string }>;
    image: string;
  };

  @Prop([
    {
      img: String,
      title: String,
    },
  ])
  openPosition: Array<{
    img: string;
    title: string;
  }>;

  @Prop({
    type: {
      title: String,
      description: [String],
      buttonText: String,
    },
  })
  principles: {
    title: string;
    description: string[];
    buttonText: string;
  };

  @Prop({
    type: {
      title: String,
      description: String,
      backgroundImage: String,
    },
  })
  funAtWork: {
    title: string;
    description: string;
    backgroundImage: string;
  };
}

export const CareerSchema = SchemaFactory.createForClass(Career);
