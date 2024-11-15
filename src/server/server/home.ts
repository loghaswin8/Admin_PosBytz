import axios from 'axios';
import dotenv from 'dotenv'

dotenv.config();

const NESTJS_BASE_URL = process.env.NESTJS_BASE_URL;

class IntroServer {
  public async fetchIntro(): Promise<any> {
    try {
      const response = await axios.get(`${NESTJS_BASE_URL}/home`);
      return response.data;
    } catch (error) {
      console.error('Error fetching intro data from server:', error);
      throw error;
    }
  }

  public async createIntro(introData: object): Promise<any> {
    try {
      const response = await axios.post(`${NESTJS_BASE_URL}/home`, introData);
      return response.data;
    } catch (error) {
      console.error('Error creating intro data:', error);
      throw error;
    }
  }

  public async updateIntro(introData: object): Promise<any> {
    try {
      const response = await axios.put(`${NESTJS_BASE_URL}/home`, introData);
      console.log("responssasas in server", response?.data)
      return response.data;
    } catch (error) {
      console.error('Error updating intro data:', error);
      throw error;
    }
  }

  public async deleteIntro(id: string): Promise<any> {
    try {
      const response = await axios.delete(`${NESTJS_BASE_URL}/home/${id}`);
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
