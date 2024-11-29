import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Role } from './roles.schema'; // You can define this interface to ensure data consistency

@Injectable()
export class RolesService {
  constructor(
    @InjectModel('Role') private readonly roleModel: Model<Role>,
  ) {}

  // Create a new role
  async createRole(roleData: { name: string; permissions: string[] }): Promise<Role> {
    const newRole = new this.roleModel(roleData);
    return await newRole.save();
  }

  // Get all roles
  async getAllRoles(): Promise<Role[]> {
    return await this.roleModel.find().exec();
  }
}
