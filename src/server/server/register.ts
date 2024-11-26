import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();

// Get the base URL from environment variables
const NESTJS_BASE_URL = process.env.NESTJS_BASE_URL;

class RegisterServer {
  // Check if the email already exists in the system
  public async checkEmailExists(email: string): Promise<any> {
    try {
      const response = await axios.get(`${NESTJS_BASE_URL}/user/check-email?email=${email}`);
      return response.data;
    } catch (error) {
      console.error('Error checking email existence:', error);
      throw error;
    }
  }

  // Register a new user
  public async registerUser(userData: object): Promise<any> {
    try {
      const response = await axios.post(`${NESTJS_BASE_URL}/user`, userData);
      return response.data;
    } catch (error) {
      console.error('Error registering user:', error);
      throw error;
    }
  }

  // Fetch user details by ID
  public async getUserById(id: string): Promise<any> {
    try {
      const response = await axios.get(`${NESTJS_BASE_URL}/user/${id}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching user by ID:', error);
      throw error;
    }
  }

  // Fetch all registered users
  public async getAllUsers(): Promise<any> {
    try {
      const response = await axios.get(`${NESTJS_BASE_URL}/user/all`);
      return response.data;
    } catch (error) {
      console.error('Error fetching all users:', error);
      throw error;
    }
  }
}

// Export the server instance
export const registerServer = new RegisterServer();

// Export the handlers to use in API routes
export const registerHandlers = {
  checkEmailExists: registerServer.checkEmailExists.bind(registerServer),
  post: registerServer.registerUser.bind(registerServer),
  get: registerServer.getUserById.bind(registerServer),
  getAllUsers: registerServer.getAllUsers.bind(registerServer), // Add method for fetching all users
};
