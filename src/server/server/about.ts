import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();

const NESTJS_BASE_URL = process.env.NESTJS_BASE_URL;

class AboutServer {
  private getAuthHeaders(token: string) {
    console.log('Server Token:', token); // Log to verify token retrieval

    if (!token) {
      throw new Error('Authentication data missing');
    }

    return {
      'Authorization': token,
    };
  }

  public async fetchAbout(token: string): Promise<any> {
    try {
      const headers = this.getAuthHeaders(token);
      const response = await axios.get(`${NESTJS_BASE_URL}/about`, { headers });
      console.log('Response from backend server:', response.data);
      return response.data;
    } catch (error) {
      console.error('Error fetching about data from server:', error);
      throw error;
    }
  }

  public async createAbout(aboutData: object, token: string): Promise<any> {
    try {
      const headers = this.getAuthHeaders(token);
      const response = await axios.post(`${NESTJS_BASE_URL}/about`, aboutData, { headers });
      return response.data;
    } catch (error) {
      console.error('Error creating about data:', error);
      throw error;
    }
  }

  public async updateAbout(aboutData: object, token: string): Promise<any> {
    try {
      const headers = this.getAuthHeaders(token);
      const response = await axios.put(`${NESTJS_BASE_URL}/about`, aboutData, { headers });
      console.log('Response in server:', response.data);
      return response.data;
    } catch (error) {
      console.error('Error updating about data:', error);
      throw error;
    }
  }

  public async deleteAbout(id: string, token: string): Promise<any> {
    try {
      const headers = this.getAuthHeaders(token);
      const response = await axios.delete(`${NESTJS_BASE_URL}/about/${id}`, { headers });
      return response.data;
    } catch (error) {
      console.error('Error deleting about data:', error);
      throw error;
    }
  }
}

export const aboutServer = new AboutServer();

export const aboutHandlers = {
  get: aboutServer.fetchAbout.bind(aboutServer),
  post: aboutServer.createAbout.bind(aboutServer),
  put: aboutServer.updateAbout.bind(aboutServer),
  delete: aboutServer.deleteAbout.bind(aboutServer),
};
