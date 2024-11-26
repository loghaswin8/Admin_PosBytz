  import axios from 'axios';
  import { parseCookies } from 'nookies';
  import Cookies from 'js-cookie';


  class IntroClient {
    private baseUrl: string;

    constructor() {
      this.baseUrl = '/api/home';
    }

    private getAuthHeaders() {
      const token = sessionStorage.getItem('token');
      // const userId = sessionStorage.getItem('user_id');
      //  const cookies = parseCookies();
      //   const token = cookies.token;

      // console.log('Session Token:', token);
      // console.log('Session User ID:', userId); 

      // if (!token ) {
      //   throw new Error('Authentication data missing');
      // }

      return {
        'Authorization': token,
      };
    }

    public async fetchIntro(id: string): Promise<any> {
      try {
        // const headers = this.getAuthHeaders(); 

        // const token = sessionStorage.getItem('token')
        const token = Cookies.get('token') || sessionStorage.getItem('token');
        // const cookies = parseCookies();
        // const token = cookies.token;
        
        if (!token) {
          throw new Error('Token not found');
        }

        const response = await axios.get(`${this.baseUrl}/get?id=${id}`, { 
          headers: {
            'Authorization': token,
          } 
        });
        console.log('Fetched data:', response.data);
        return response.data.data;
      } catch (error) {
        console.error('Error fetching intro data from client:', error);
        throw error;
      }
    }

    public async updateIntro(introData: object): Promise<any> {
      try {
        const headers = this.getAuthHeaders();
        const response = await axios.put(`${this.baseUrl}/put`, introData, { headers });
        return response.data;
      } catch (error) {
        console.error('Error updating intro data from client:', error);
        throw error;
      }
    }

    public async createIntro(introData: object): Promise<any> {
      try {
        const headers = this.getAuthHeaders();
        const response = await axios.post(`${this.baseUrl}/post`, introData, { headers });
        return response.data;
      } catch (error) {
        console.error('Error creating intro data from client:', error);
        throw error;
      }
    }

    public async deleteIntro(id: string): Promise<any> {
      try {
        const headers = this.getAuthHeaders();
        const response = await axios.delete(`${this.baseUrl}/delete?id=${id}`, { headers });
        return response.data;
      } catch (error) {
        console.error('Error deleting intro data from client:', error);
        throw error;
      }
    }
  }

  export default new IntroClient();
