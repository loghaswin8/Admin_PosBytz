import axios from 'axios';
import dotenv from 'dotenv'

dotenv.config();

const NESTJS_BASE_URL = process.env.NESTJS_BASE_URL;

class SupportServer {
  // Fetch support data from the server (GET)
  public async fetchSupport(): Promise<any> {
    try {
      const response = await axios.get(`${NESTJS_BASE_URL}/support`);
      return response.data;
    } catch (error) {
      console.error('Error fetching support data from server:', error);
      throw error;
    }
  }

  // Create support data on the server (POST)
  public async createSupport(supportData: object): Promise<any> {
    try {
      const response = await axios.post(`${NESTJS_BASE_URL}/support`, supportData);
      return response.data;
    } catch (error) {
      console.error('Error creating support data:', error);
      throw error;
    }
  }

  // Update support data on the server (PUT)
  public async updateSupport(supportData: object): Promise<any> {
    try {
      const response = await axios.put(`${NESTJS_BASE_URL}/support`, supportData);
      return response.data;
    } catch (error) {
      console.error('Error updating support data:', error);
      throw error;
    }
  }

  // Delete support data from the server (DELETE)
  public async deleteSupport(id: string): Promise<any> {
    try {
      const response = await axios.delete(`${NESTJS_BASE_URL}/support/${id}`);
      return response.data;
    } catch (error) {
      console.error('Error deleting support data:', error);
      throw error;
    }
  }
}

// Export the instance of SupportServer to use in handlers
export const supportServer = new SupportServer();

// Handlers Object for server-side requests
export const supportHandlers = {
  get: supportServer.fetchSupport.bind(supportServer),
  post: supportServer.createSupport.bind(supportServer),
  put: supportServer.updateSupport.bind(supportServer),
  delete: supportServer.deleteSupport.bind(supportServer),
};
