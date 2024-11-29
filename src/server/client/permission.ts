import axios from 'axios';

class PermissionClient {
  private baseUrl: string;

  constructor() {
    this.baseUrl = '/api/permission'; // Assuming the API endpoint is set
  }

  // Create a new permission
  public async createPermission(permissionData: { name: string; entity: string; slug: string }): Promise<any> {
    try {
      const response = await axios.post(`${this.baseUrl}/post`, permissionData, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      return response.data;
    } catch (error) {
      console.error('Error creating permission:', error);
      throw new Error('Error creating permission');
    }
  }

  public async getAllPermissions(): Promise<any> {
    try {
      const response = await axios.get(`${this.baseUrl}/get`); 
      return response.data.permissions;
    } catch (error) {
      console.error('Error fetching permissions:', error);
      throw new Error('Error fetching permissions');
    }
  }
}

export default new PermissionClient();
