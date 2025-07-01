
export interface LoginCredentials {
  username: string;
  password: string;
  subdomain: string;
}

export interface AuthResponse {
  token: string;
  lifetime: number;
}

export interface User {
  username: string;
  token: string;
  subdomain: string;
}
