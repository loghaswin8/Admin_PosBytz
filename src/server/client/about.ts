import axios from 'axios';

class AboutClient {
  private baseUrl: string;

  constructor() {
    this.baseUrl = '/api/about';
  }

  public async fetchAbout(id: string): Promise<any> {
    try {
        const response = await axios.get(`/api/about/get?id=${id}`, {
          headers: {
            'Content-Type': 'application/json',
          },
        });
        return response.data;
      } catch (error) {
        console.error('Error fetching about data:', error);
        throw new Error('Error fetching about data');
      }
  }

  public async updateAbout(aboutData: object): Promise<any> {
    try {
      const response = await axios.put(`${this.baseUrl}/put`, aboutData);
      return response.data; 
    } catch (error) {
      console.error('Error updating about data from client:', error);
      throw error;
    }
  }

  public async createAbout(aboutData: object): Promise<any> {
    try {
      const response = await axios.post(`${this.baseUrl}/post`, aboutData);
      return response.data; 
    } catch (error) {
      console.error('Error creating about data from client:', error);
      throw error;
    }
  }

  public async deleteAbout(id: string): Promise<any> {
    try {
      const response = await axios.delete(`${this.baseUrl}/delete?id=${id}`);
      return response.data;
    } catch (error) {
      console.error('Error deleting about data from client:', error);
      throw error;
    }
  }
}

export default new AboutClient();
