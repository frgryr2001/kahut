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
  action: string;
  email: string;
  username?: string;
}

export interface SignUpDataRes {
  email: string;
  otp: string;
  expired: number;
}
// Verify OTP interface
export interface AuthVerifyOtpResponse {
  code: number;
  success: boolean;
  data: User;
  message: string;
}

export interface AuthGoogleResponse extends AuthVerifyOtpResponse {}
export interface VerifyOtpData {
  email: string;
  otp: string;
  password: string;
  username: string;
}

export type AuthRefreshToken = Pick<
  AuthVerifyOtpResponse,
  'code' | 'success' | 'message'
> & {
  data: {
    access_token: string;
    refresh_token: string;
  };
};
export type AuthDataEmpty = Pick<
  AuthVerifyOtpResponse,
  'code' | 'success' | 'message'
> & {
  data: {};
};

export type UpdateUserResponse = Pick<
  AuthVerifyOtpResponse,
  'code' | 'success' | 'message'
> & {
  data: {
    id: number;
    username: string;
    image: string;
  };
};
