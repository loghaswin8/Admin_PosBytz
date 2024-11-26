import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();

const NESTJS_BASE_URL = process.env.NESTJS_BASE_URL;

class ContactServer {
  private getAuthHeaders(token: string) {
    console.log('Server Token:', token);  // Log to verify token retrieval

    if (!token) {
      throw new Error('Authentication data missing');
    }

    return {
      'Authorization': token,
    };
  }

  public async fetchContact(token: string): Promise<any> {
    try {
      const headers = this.getAuthHeaders(token);
      const response = await axios.get(`${NESTJS_BASE_URL}/contact`, { headers });
      console.log('Response from backend server:', response.data);
      return response.data;
    } catch (error) {
      console.error('Error fetching contact data from server:', error);
      throw error;
    }
  }

  public async createContact(contactData: object, token: string): Promise<any> {
    try {
      const headers = this.getAuthHeaders(token);
      const response = await axios.post(`${NESTJS_BASE_URL}/contact`, contactData, { headers });
      return response.data;
    } catch (error) {
      console.error('Error creating contact data:', error);
      throw error;
    }
  }

  public async updateContact(contactData: object, token: string): Promise<any> {
    try {
      const headers = this.getAuthHeaders(token);
      const response = await axios.put(`${NESTJS_BASE_URL}/contact`, contactData, { headers });
      console.log('Response in server:', response.data);
      return response.data;
    } catch (error) {
      console.error('Error updating contact data:', error);
      throw error;
    }
  }

  public async deleteContact(id: string, token: string): Promise<any> {
    try {
      const headers = this.getAuthHeaders(token);
      const response = await axios.delete(`${NESTJS_BASE_URL}/contact/${id}`, { headers });
      return response.data;
    } catch (error) {
      console.error('Error deleting contact data:', error);
      throw error;
    }
  }
}

export const contactServer = new ContactServer();

export const contactHandlers = {
  get: contactServer.fetchContact.bind(contactServer),
  post: contactServer.createContact.bind(contactServer),
  put: contactServer.updateContact.bind(contactServer),
  delete: contactServer.deleteContact.bind(contactServer),
};
