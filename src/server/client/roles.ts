import axios from 'axios';

class RoleClient {
  private baseUrl: string;

  constructor() {
    this.baseUrl = '/api/roles'; // API endpoint for roles
  }

  // Create a new role
  public async createRole(roleData: { name: string; permissions: string[] }): Promise<any> {
    try {
      const response = await axios.post(`${this.baseUrl}/post`, roleData, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      return response.data;
    } catch (error) {
      console.error('Error creating role:', error);
      throw new Error('Error creating role');
    }
  }

  // Get all roles
  public async getAllRoles(): Promise<any> {
    try {
      const response = await axios.get(`${this.baseUrl}/get`);
      return response.data.roles;
    } catch (error) {
      console.error('Error fetching roles:', error);
      throw new Error('Error fetching roles');
    }
  }
}

export default new RoleClient();
