import { Schema, Document } from 'mongoose';

export interface Login {
  email: string;
  password: string;
}

export interface LoginDocument extends Document, Login {}

export const LoginSchema = new Schema<Login>(
  {
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
  },
  {
    timestamps: true,
  },
);
