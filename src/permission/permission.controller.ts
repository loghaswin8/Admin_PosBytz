// src/permission/permission.controller.ts
import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { PermissionService } from './permission.service';

@Controller('entityPermission')
export class PermissionController {
  constructor(private readonly permissionService: PermissionService) {}

  @Post('/entity')
  async createEntity(@Body() createEntityDto: any) {
    return this.permissionService.createEntity(createEntityDto);
  }

  @Get('/entities')
  async getAllEntities() {
    return this.permissionService.findAllEntities();
  }

  // Get Entity by ID
  @Get('/entity/:id')
  async getEntityById(@Param('id') id: string) {
    return this.permissionService.findEntityById(id);
  }

  @Post('/permission')
  async createPermission(@Body() createPermissionDto: any) {
    return this.permissionService.createPermission(createPermissionDto);
  }

  @Get('/permissions')
  async getAllPermissions() {
    return this.permissionService.findAllPermissions();
  }
}
