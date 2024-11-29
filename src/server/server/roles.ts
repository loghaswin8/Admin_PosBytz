import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();

const NESTJS_BASE_URL = process.env.NESTJS_BASE_URL;

class RoleServer {
  // Create a new role in the database
  public async createRole(roleData: { name: string; permissions: string[] }): Promise<any> {
    try {
      const response = await axios.post(`${NESTJS_BASE_URL}/rolePermission/role`, roleData);
      return response.data;
    } catch (error) {
      console.error('Error creating role:', error);
      throw error;
    }
  }

  // Fetch all roles from the database
  public async getAllRoles(): Promise<any> {
    try {
      const response = await axios.get(`${NESTJS_BASE_URL}/rolePermission/roles`);
        console.log('get all roles:', response);
      return response.data;
    } catch (error) {
      console.error('Error fetching roles:', error);
      throw error;
    }
  }
}

// Export server instance
export const roleServer = new RoleServer();

// Export handlers to use in API routes
export const roleHandlers = {
  createRole: roleServer.createRole.bind(roleServer),
  getAllRoles: roleServer.getAllRoles.bind(roleServer),
};
