import axios from 'axios';

class ApiClient {
  protected async post(url: string, data: object): Promise<any> {
    try {
      const response = await axios.post(url, data, {
        headers: { 'Content-Type': 'application/json' },
      });
      return response.data;
    } catch (error) {
      console.error(`Error posting to ${url}:`, error);
      throw new Error('Error processing the request');
    }
  }

  protected async get(url: string): Promise<any> {
    try {
      const response = await axios.get(url);
      return response.data;
    } catch (error) {
      console.error(`Error fetching from ${url}:`, error);
      throw new Error('Error processing the request');
    }
  }
}

export default ApiClient;
