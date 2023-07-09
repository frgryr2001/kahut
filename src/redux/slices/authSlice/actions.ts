import {createAsyncThunk} from '@reduxjs/toolkit';
import httpClient from '../../../services/utils/httpClient';
import {
  AuthLogoutToken,
  AuthRefreshToken,
  AuthSignUpResponse,
  AuthVerifyOtpResponse,
  SignUpData,
  VerifyOtpData,
} from '../../../types/user';

export const signUp = createAsyncThunk(
  'auth/signUp',
  async (data: SignUpData, thunkAPI) => {
    try {
      const response = await httpClient.post<AuthSignUpResponse>({
        url: '/auth/sign-up/send-otp',
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

export const verifyOtpSignUp = createAsyncThunk(
  'auth/sendOtpSignUp',
  async (data: VerifyOtpData, thunkAPI) => {
    try {
      const response = await httpClient.post<AuthVerifyOtpResponse>({
        url: '/auth/sign-up/verify-otp',
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
      email: string;
    },
    thunkAPI,
  ) => {
    try {
      const response = await httpClient.post<AuthSignUpResponse>({
        url: '/auth/sign-up/resend-otp',
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

export const logOut = createAsyncThunk(
  'auth/logOut',
  async (
    data: {
      refreshToken: string;
    },
    thunkAPI,
  ) => {
    try {
      const response = await httpClient.post<AuthLogoutToken>({
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
    console.log('data', data);

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
