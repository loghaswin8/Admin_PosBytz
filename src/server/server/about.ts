import axios from 'axios';
import dotenv from 'dotenv'

dotenv.config();

const NESTJS_BASE_URL = process.env.NESTJS_BASE_URL;

class AboutServer {
  // Fetch about data from the server (GET)
  public async fetchAbout(): Promise<any> {
    try {
      const response = await axios.get(`${NESTJS_BASE_URL}/about`);
      return response.data;
    } catch (error) {
      console.error('Error fetching about data from server:', error);
      throw error;
    }
  }

  // Create about data on the server (POST)
  public async createAbout(aboutData: object): Promise<any> {
    try {
      const response = await axios.post(`${NESTJS_BASE_URL}/about`, aboutData);
      return response.data;
    } catch (error) {
      console.error('Error creating about data:', error);
      throw error;
    }
  }

  // Update about data on the server (PUT)
  public async updateAbout(aboutData: object): Promise<any> {
    try {
      const response = await axios.put(`${NESTJS_BASE_URL}/about`, aboutData);
      return response.data;
    } catch (error) {
      console.error('Error updating about data:', error);
      throw error;
    }
  }

  // Delete about data from the server (DELETE)
  public async deleteAbout(id: string): Promise<any> {
    try {
      const response = await axios.delete(`${NESTJS_BASE_URL}/about/${id}`);
      return response.data;
    } catch (error) {
      console.error('Error deleting about data:', error);
      throw error;
    }
  }
}

// Export the instance of AboutServer to use in handlers
export const aboutServer = new AboutServer();

// Handlers Object for server-side requests
export const aboutHandlers = {
  get: aboutServer.fetchAbout.bind(aboutServer),
  post: aboutServer.createAbout.bind(aboutServer),
  put: aboutServer.updateAbout.bind(aboutServer),
  delete: aboutServer.deleteAbout.bind(aboutServer),
};
