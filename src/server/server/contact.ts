import axios from 'axios';
import dotenv from 'dotenv'

dotenv.config();

const NESTJS_BASE_URL = process.env.NESTJS_BASE_URL;

class ContactServer {
  // Fetch contact data from the server (GET)
  public async fetchContact(): Promise<any> {
    try {
      const response = await axios.get(`${NESTJS_BASE_URL}/contact`);
      return response.data;
    } catch (error) {
      console.error('Error fetching contact data from server:', error);
      throw error;
    }
  }

  // Create contact data on the server (POST)
  public async createContact(contactData: object): Promise<any> {
    try {
      const response = await axios.post(`${NESTJS_BASE_URL}/contact`, contactData);
      return response.data;
    } catch (error) {
      console.error('Error creating contact data:', error);
      throw error;
    }
  }

  // Update contact data on the server (PUT)
  public async updateContact(contactData: object): Promise<any> {
    try {
      const response = await axios.put(`${NESTJS_BASE_URL}/contact`, contactData);
      return response.data;
    } catch (error) {
      console.error('Error updating contact data:', error);
      throw error;
    }
  }

  // Delete contact data from the server (DELETE)
  public async deleteContact(id: string): Promise<any> {
    try {
      const response = await axios.delete(`${NESTJS_BASE_URL}/contact/${id}`);
      return response.data;
    } catch (error) {
      console.error('Error deleting contact data:', error);
      throw error;
    }
  }
}

// Export the instance of ContactServer to use in handlers
export const contactServer = new ContactServer();

// Handlers Object for server-side requests
export const contactHandlers = {
  get: contactServer.fetchContact.bind(contactServer),
  post: contactServer.createContact.bind(contactServer),
  put: contactServer.updateContact.bind(contactServer),
  delete: contactServer.deleteContact.bind(contactServer),
};
