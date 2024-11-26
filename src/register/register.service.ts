import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, RegisterDocument } from './register.schema';
import * as bcrypt from 'bcryptjs';
import { Types } from 'mongoose';  // To handle ObjectIds

@Injectable()
export class RegisterService {
  constructor(
    @InjectModel(User.name) private registerModel: Model<RegisterDocument>,
  ) { }

  // Create a new user
  async create(registerData: Partial<User>): Promise<User> {
    try {
      const hashedPassword = await this.hashPassword(registerData.password);
      const newUser = new this.registerModel({
        ...registerData,
        password: hashedPassword,
      });
      return await newUser.save();
    } catch (error) {
      console.error('Error creating user:', error.message);
      throw error;
    }
  }

  async getAllUsers(): Promise<User[]> {
    try {
      return await this.registerModel.find().exec();
    } catch (error) {
      console.error('Error fetching all users:', error.message);
      throw error;
    }
  }

  // Import necessary types


  // Add this method inside the RegisterService class
  async findById(id: string): Promise<User | null> {
    try {
      // Ensure the ID is a valid ObjectId
      if (!Types.ObjectId.isValid(id)) {
        throw new Error('Invalid user ID');
      }

      // Use Mongoose's findById method to fetch the user
      return await this.registerModel.findById(id).exec();
    } catch (error) {
      console.error('Error finding user by ID:', error.message);
      throw error;
    }
  }


  // Find a user by email
    async findByEmail(email: string): Promise<User | null> {
      try {
        return await this.registerModel.findOne({ email }).exec();
      } catch (error) {
        console.error('Error finding user by email:', error.message);
        throw error;
      }
    }

  async checkEmailExists(email: string): Promise<{ emailExists: boolean }> {
    const user = await this.registerModel.findOne({ email }).exec();
    return { emailExists: !!user };  // Make sure we return a boolean value
  }


  // Update user details
  async update(
    id: string,
    updateData: Partial<User>,
  ): Promise<User | null> {
    try {
      if (updateData.password) {
        updateData.password = await this.hashPassword(updateData.password);
      }
      return await this.registerModel.findByIdAndUpdate(id, updateData, {
        new: true,
      }).exec();
    } catch (error) {
      console.error('Error updating user:', error.message);
      throw error;
    }
  }

  // Delete a user by ID
  async delete(id: string): Promise<{ deletedCount?: number }> {
    try {
      return await this.registerModel.deleteOne({ _id: id }).exec();
    } catch (error) {
      console.error('Error deleting user:', error.message);
      throw error;
    }
  }

  private async hashPassword(password: string): Promise<string> {
    const saltRounds = 10;
    return await bcrypt.hash(password, saltRounds);
  }
}
