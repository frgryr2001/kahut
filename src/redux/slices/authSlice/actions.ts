import {createAsyncThunk} from '@reduxjs/toolkit';
import httpClient from '../../../services/utils/httpClient';
import {
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
