import {createAsyncThunk} from '@reduxjs/toolkit';
import httpClient from '../../../services/utils/httpClient';
import {AuthSignUpResponse, SignUpData} from '../../../types/user';

export const signUp = createAsyncThunk(
  'auth/signUp',
  async (data: SignUpData, thunkAPI) => {
    try {
      const response = await httpClient.post<AuthSignUpResponse>(
        '/auth/signup/send-otp',
        data,
        {
          signal: thunkAPI.signal,
        },
      );
      return response.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  },
);
