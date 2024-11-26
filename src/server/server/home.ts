import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();

const NESTJS_BASE_URL = process.env.NESTJS_BASE_URL;

class IntroServer {
  public async fetchIntro(token: string ): Promise<any> {
    try {
      console.log('Server Token:', token);
      // console.log('Server User ID:', userId);
      
      const response = await axios.get(`${NESTJS_BASE_URL}/home`, {
        headers: {
          Authorization: token,
          // 'X-User-ID': userId, 
        },
      });

      console.log('Response from backend server:', response.data);
      return response.data;
    } catch (error) {
      console.error('Error fetching intro data from server:', error);
      throw error;
    }
  }

  public async createIntro(introData: object, token: string, userId: string): Promise<any> {
    try {
      const response = await axios.post(`${NESTJS_BASE_URL}/home`, introData, {
        headers: {
          Authorization: token,
          'X-User-ID': userId,
        },
      });
      return response.data;
    } catch (error) {
      console.error('Error creating intro data:', error);
      throw error;
    }
  }

  public async updateIntro(introData: object, token: string): Promise<any> {
    try {
      const response = await axios.put(`${NESTJS_BASE_URL}/home`, introData, {
        headers: {
          Authorization: token,
        },
      });
      console.log('Response in server:', response.data);
      return response.data;
    } catch (error) {
      console.error('Error updating intro data:', error);
      throw error;
    }
  }

  public async deleteIntro(id: string, token: string, userId: string): Promise<any> {
    try {
      const response = await axios.delete(`${NESTJS_BASE_URL}/home/${id}`, {
        headers: {
          Authorization: token,
          'X-User-ID': userId,
        },
      });
      return response.data;
    } catch (error) {
      console.error('Error deleting intro data:', error);
      throw error;
    }
  }
}

export const introServer = new IntroServer();

export const introHandlers = {
  get: introServer.fetchIntro.bind(introServer),
  post: introServer.createIntro.bind(introServer),
  put: introServer.updateIntro.bind(introServer),
  delete: introServer.deleteIntro.bind(introServer),
};
