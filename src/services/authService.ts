
import axios from 'axios';
import { LoginCredentials, AuthResponse } from '../types/auth';

const API_BASE_URL = 'https://{subdomain}.ox-sys.com';

export const authService = {
  async login(credentials: LoginCredentials): Promise<AuthResponse> {
    const url = API_BASE_URL.replace('{subdomain}', credentials.subdomain);
    
    const formData = new URLSearchParams();
    formData.append('_username', credentials.username);
    formData.append('_password', credentials.password);
    formData.append('_subdomain', credentials.subdomain);

    const response = await axios.post(`${url}/security/auth_check`, formData, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Accept': 'application/json',
      },
    });

    return response.data;
  },

  setToken(token: string) {
    localStorage.setItem('auth_token', token);
  },

  getToken(): string | null {
    return localStorage.getItem('auth_token');
  },

  removeToken() {
    localStorage.removeItem('auth_token');
  },

  isAuthenticated(): boolean {
    return !!this.getToken();
  },
};
