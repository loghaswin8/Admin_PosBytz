// src/permission/schemas/permission.schema.ts
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ collection: 'permissions' })
export class Permission extends Document {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  entity: string;  // References the name or slug of an entity

  @Prop({ required: true, unique: true })
  slug: string;
}


export interface Permission extends Document {
  name: string;
}

export const PermissionSchema = SchemaFactory.createForClass(Permission);
