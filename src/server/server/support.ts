import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();

const NESTJS_BASE_URL = process.env.NESTJS_BASE_URL;

class SupportServer {
  // Private method to generate the Authorization headers
  private getAuthHeaders(token: string): object {
    console.log('Server Token:', token);  // Log to verify token retrieval

    if (!token) {
      throw new Error('Authentication data missing');
    }

    return {
      'Authorization': token,
    };
  }

  // Fetch support data with token authentication
  public async fetchSupport(token: string): Promise<any> {
    try {
      const headers = this.getAuthHeaders(token);
      const response = await axios.get(`${NESTJS_BASE_URL}/support`, { headers });
      console.log('Response from backend server:', response.data);
      return response.data;
    } catch (error) {
      console.error('Error fetching support data from server:', error);
      throw error;
    }
  }

  // Create support data
  public async createSupport(supportData: object, token: string): Promise<any> {
    try {
      const headers = this.getAuthHeaders(token);
      const response = await axios.post(`${NESTJS_BASE_URL}/support`, supportData, { headers });
      return response.data;
    } catch (error) {
      console.error('Error creating support data:', error);
      throw error;
    }
  }

  // Update support data with token authentication
  public async updateSupport(supportData: object, token: string): Promise<any> {
    try {
      const headers = this.getAuthHeaders(token);
      const response = await axios.put(`${NESTJS_BASE_URL}/support`, supportData, { headers });
      console.log('Response in server:', response.data);
      return response.data;
    } catch (error) {
      console.error('Error updating support data:', error);
      throw error;
    }
  }

  // Delete support data
  public async deleteSupport(id: string, token: string): Promise<any> {
    try {
      const headers = this.getAuthHeaders(token);
      const response = await axios.delete(`${NESTJS_BASE_URL}/support/${id}`, { headers });
      return response.data;
    } catch (error) {
      console.error('Error deleting support data:', error);
      throw error;
    }
  }
}

export const supportServer = new SupportServer();

export const supportHandlers = {
  get: supportServer.fetchSupport.bind(supportServer),
  post: supportServer.createSupport.bind(supportServer),
  put: supportServer.updateSupport.bind(supportServer),
  delete: supportServer.deleteSupport.bind(supportServer),
};
