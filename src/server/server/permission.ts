import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();

const NESTJS_BASE_URL = process.env.NESTJS_BASE_URL;

class PermissionServer {
  // Create a new entity in the database
  public async createEntity(entityData: object): Promise<any> {
    try {
      const response = await axios.post(`${NESTJS_BASE_URL}/entityPermission/entity`, entityData);
      return response.data;
    } catch (error) {
      console.error('Error creating entity:', error);
      throw error;
    }
  }

  // Fetch all entities
  public async getAllEntities(): Promise<any> {
    try {
      const response = await axios.get(`${NESTJS_BASE_URL}/entityPermission/entities`);
      return response.data;
    } catch (error) {
      console.error('Error fetching entities:', error);
      throw error;
    }
  }

  // Create a new permission in the database
  public async createPermission(permissionData: object): Promise<any> {
    try {
      const response = await axios.post(`${NESTJS_BASE_URL}/entityPermission/permission`, permissionData);
      return response.data;
    } catch (error) {
      console.error('Error creating permission:', error);
      throw error;
    }
  }

  public async getAllPermissions(): Promise<any> {
    try {
      const response = await axios.get(`${NESTJS_BASE_URL}/entityPermission/permissions`);
      return response.data;
    } catch (error) {
      console.error('Error fetching permissions:', error.message);
      throw new Error('Failed to fetch permissions');
    }
  }
}

// Export server instance
export const permissionServer = new PermissionServer();

// Export handlers to use in API routes
export const permissionHandlers = {
  getAllEntities: permissionServer.getAllEntities.bind(permissionServer),
  createPermission: permissionServer.createPermission.bind(permissionServer),
  getAllPermissions: permissionServer.getAllPermissions.bind(permissionServer),
};
