import axios from 'axios';

class ContactClient {
  private baseUrl: string;

  constructor() {
    // Base URL for API requests
    this.baseUrl = '/api/contact';
  }

  // Fetch contact data from the server (GET)
  public async fetchContact(id: string): Promise<any> {
    try {
        const response = await axios.get(`/api/contact/get?id=${id}`, {
          headers: {
            'Content-Type': 'application/json', // Example: Adjust if needed
          },
        });
        return response.data;
      } catch (error) {
        console.error('Error fetching contact data:', error);
        throw new Error('Error fetching contact data');
      }
  }

  // Update contact data on the server (PUT)
  public async updateContact(contactData: object): Promise<any> {
    try {
      const response = await axios.put(`${this.baseUrl}/put`, contactData);
      return response.data; // Return the updated data
    } catch (error) {
      console.error('Error updating contact data from client:', error);
      throw error;
    }
  }

  // Create new contact data on the server (POST)
  public async createContact(contactData: object): Promise<any> {
    try {
      const response = await axios.post(`${this.baseUrl}/post`, contactData);
      return response.data; // Return the newly created data
    } catch (error) {
      console.error('Error creating contact data from client:', error);
      throw error;
    }
  }

  // Delete contact data from the server (DELETE)
  public async deleteContact(id: string): Promise<any> {
    try {
      const response = await axios.delete(`${this.baseUrl}/delete?id=${id}`);
      return response.data; // Return the result of the deletion
    } catch (error) {
      console.error('Error deleting contact data from client:', error);
      throw error;
    }
  }
}

export default new ContactClient();
