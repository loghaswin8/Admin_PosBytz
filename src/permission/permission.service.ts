// src/permission/permission.service.ts
import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Entity } from './schemas/entity.schema';
import { Permission } from './schemas/permission.schema';

@Injectable()
export class PermissionService {
  constructor(
    @InjectModel(Entity.name) private entityModel: Model<Entity>,
    @InjectModel(Permission.name) private permissionModel: Model<Permission>,
  ) {}

  // Create Entity with Duplicate Check
  async createEntity(createEntityDto: any): Promise<Entity> {
    const existingEntity = await this.entityModel.findOne({ name: createEntityDto.name }).exec();

    if (existingEntity) {
      throw new ConflictException(`Entity with name "${createEntityDto.name}" already exists.`);
    }

    const createdEntity = new this.entityModel(createEntityDto);
    return createdEntity.save();
  }

  // Get All Entities
  async findAllEntities(): Promise<Entity[]> {
    return this.entityModel.find().exec();
  }

  // Get Entity by ID
  async findEntityById(entityId: string): Promise<Entity> {
    const entity = await this.entityModel.findById(entityId).exec();
    if (!entity) {
      throw new NotFoundException(`Entity with ID "${entityId}" not found.`);
    }
    return entity;
  }

  // Create Permission
  async createPermission(createPermissionDto: any): Promise<Permission> {
    const createdPermission = new this.permissionModel(createPermissionDto);
    return createdPermission.save();
  }

  // Get All Permissions
  async findAllPermissions(): Promise<Permission[]> {
    return this.permissionModel.find().exec();
  }
}
