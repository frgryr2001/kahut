export interface User {
  id?: number;
  name: string;
  username: string;
  image: string;
  created_at?: number;
  access_token: string;
  refresh_token: string;
}
// Sign up interface
export interface AuthSignUpResponse {
  code: number;
  success: boolean;
  data: SignUpDataRes;
  message: string;
}
export interface SignUpData {
  email: string;
  username: string;
}

export interface SignUpDataRes {
  email: string;
  otp: string;
  expired: number;
}
