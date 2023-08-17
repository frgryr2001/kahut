import {createAsyncThunk} from '@reduxjs/toolkit';
import httpClient from '../../../services/utils/httpClient';
import {
  AuthGoogleResponse,
  AuthDataEmpty,
  AuthRefreshToken,
  AuthSignUpResponse,
  AuthVerifyOtpResponse,
  SignUpData,
  VerifyOtpData,
} from '../../../types/user';

export const sendOtp = createAsyncThunk(
  'auth/send-otp',
  async (data: SignUpData, thunkAPI) => {
    try {
      const response = await httpClient.post<AuthSignUpResponse>({
        url: '/auth/send-otp',
        data,
        config: {
          signal: thunkAPI.signal,
          headers: {
            'ngrok-skip-browser-warning': 'true',
          },
        },
      });
      return response.data;
    } catch (error: any) {
      console.log('Lỗi', JSON.stringify(error.response, null, 2));

      return thunkAPI.rejectWithValue(error.response.data);
    }
  },
);

export const verifyOtpSignUp = createAsyncThunk(
  'auth/sendOtpSignUp',
  async (data: VerifyOtpData, thunkAPI) => {
    try {
      const response = await httpClient.post<AuthVerifyOtpResponse>({
        url: '/auth/sign-up',
        data,
        config: {
          signal: thunkAPI.signal,
          headers: {
            'ngrok-skip-browser-warning': 'true',
          },
        },
      });

      return response.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  },
);
export const resendCodeOtp = createAsyncThunk(
  'auth/resendCodeOtp',
  async (
    data: {
      action: string;
      email: string;
      username: string;
    },
    thunkAPI,
  ) => {
    try {
      const response = await httpClient.post<AuthSignUpResponse>({
        url: '/auth/send-otp',
        data,
        config: {
          signal: thunkAPI.signal,
          headers: {
            'ngrok-skip-browser-warning': 'true',
          },
        },
      });

      return response.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  },
);

export const signOut = createAsyncThunk(
  'auth/signOut',
  async (
    data: {
      refreshToken: string;
    },
    thunkAPI,
  ) => {
    try {
      const response = await httpClient.post<AuthDataEmpty>({
        url: '/auth/sign-out',
        data,
        config: {
          signal: thunkAPI.signal,
          headers: {
            'ngrok-skip-browser-warning': 'true',
          },
        },
      });

      return response.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response);
    }
  },
);

export const refreshToken = createAsyncThunk(
  'auth/refreshToken',
  async (
    data: {
      refreshToken: string;
    },
    thunkAPI,
  ) => {
    try {
      const response = await httpClient.post<AuthRefreshToken>({
        url: '/auth/refresh-access-token',
        data,
        config: {
          signal: thunkAPI.signal,
          headers: {
            'ngrok-skip-browser-warning': 'true',
          },
        },
      });

      return response.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  },
);

export const signIn = createAsyncThunk(
  'auth/signIn',
  async (
    data: {
      email: string;
      password: string;
    },
    thunkAPI,
  ) => {
    try {
      const response = await httpClient.post<AuthVerifyOtpResponse>({
        url: '/auth/sign-in/email',
        data,
        config: {
          signal: thunkAPI.signal,
          headers: {
            'ngrok-skip-browser-warning': 'true',
          },
        },
      });
      return response.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  },
);

export const signInWithGoogle = createAsyncThunk(
  'auth/signInWithGoogle',
  async (
    data: {
      googleId: string;
      googleToken: string | null;
    },
    thunkAPI,
  ) => {
    try {
      const response = await httpClient.post<AuthGoogleResponse>({
        url: '/auth/sign-in/google',
        data,
        config: {
          signal: thunkAPI.signal,
          headers: {
            'ngrok-skip-browser-warning': 'true',
          },
        },
      });

      console.log('Lỗi', response.data);

      return response.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  },
);

export const resetPassword = createAsyncThunk(
  'auth/resetPassword',
  async (
    data: {
      email: string;
      otp: string;
      password: string;
    },
    thunkAPI,
  ) => {
    try {
      const response = await httpClient.post<AuthDataEmpty>({
        url: '/auth/reset-password',
        data,
        config: {
          signal: thunkAPI.signal,
          headers: {
            'ngrok-skip-browser-warning': 'true',
          },
        },
      });

      return response.success;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  },
);
