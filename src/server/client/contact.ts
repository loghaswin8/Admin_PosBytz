import axios from 'axios';
import Cookies from 'js-cookie';

class ContactClient {
  private baseUrl: string;

  constructor() {
    this.baseUrl = '/api/contact';
  }

  private getAuthHeaders() {
    const token = Cookies.get('token') || sessionStorage.getItem('token');
    console.log('Session Token:', token); 

    return {
      'Authorization': token,
    };
  }

  public async fetchContact(id: string): Promise<any> {
    try {
      const headers = this.getAuthHeaders();
      const response = await axios.get(`${this.baseUrl}/get?id=${id}`, { headers });
      console.log('Fetched contact data:', response.data);
      return response.data.data;
    } catch (error) {
      console.error('Error fetching contact data:', error);
      throw error;
    }
  }

  public async updateContact(contactData: object): Promise<any> {
    try {
      const headers = this.getAuthHeaders();
      const response = await axios.put(`${this.baseUrl}/put`, contactData, { headers });
      console.log('Updated contact data:', response.data);
      return response.data;
    } catch (error) {
      console.error('Error updating contact data:', error);
      throw error;
    }
  }

  public async createContact(contactData: object): Promise<any> {
    try {
      const headers = this.getAuthHeaders();
      const response = await axios.post(`${this.baseUrl}/post`, contactData, { headers });
      console.log('Created contact data:', response.data);
      return response.data;
    } catch (error) {
      console.error('Error creating contact data:', error);
      throw error;
    }
  }

  public async deleteContact(id: string): Promise<any> {
    try {
      const headers = this.getAuthHeaders();
      const response = await axios.delete(`${this.baseUrl}/delete?id=${id}`, { headers });
      console.log('Deleted contact data:', response.data);
      return response.data;
    } catch (error) {
      console.error('Error deleting contact data:', error);
      throw error;
    }
  }
}

export default new ContactClient();
