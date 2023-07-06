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
          headers: {
            'ngrok-skip-browser-warning': 'true',
          },
        },
      );
      return response.data;
    } catch (error: any) {
      console.log(error);

      //   return thunkAPI.rejectWithValue(error);
    }
  },
);
