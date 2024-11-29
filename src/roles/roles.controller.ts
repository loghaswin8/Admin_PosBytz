import { Controller, Post, Get, Body } from '@nestjs/common';
import { RolesService } from './roles.service';

@Controller('rolePermission')
export class RolesController {
  constructor(private readonly rolesService: RolesService) {}

  // Create a new role
  @Post('role')
  async createRole(@Body() roleData: { name: string; permissions: string[] }) {
    return await this.rolesService.createRole(roleData);
  }

  // Get all roles
  @Get('roles')
  async getAllRoles() {
    return await this.rolesService.getAllRoles();
  }
}
