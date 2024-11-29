import { Schema } from 'mongoose';

export const RoleSchema = new Schema(
  {
    name: { type: String, required: true },
    permissions: [{ type: Schema.Types.ObjectId, ref: 'Permission' }],
  },
  {
    timestamps: true,
  },
);

import { Document } from 'mongoose';
import { Permission } from '../permission/schemas/permission.schema';

export interface Role extends Document {
  name: string;
  permissions: Permission[];
}

