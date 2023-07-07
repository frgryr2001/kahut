import {AnyAction, AsyncThunk, createSlice} from '@reduxjs/toolkit';
import {User} from '../../../types/user';
import {signUp, verifyOtpSignUp} from './actions';

type GenericAsyncThunk = AsyncThunk<unknown, unknown, any>;

type PendingAction = ReturnType<GenericAsyncThunk['pending']>;
type RejectedAction = ReturnType<GenericAsyncThunk['rejected']>;
type FulfilledAction = ReturnType<GenericAsyncThunk['fulfilled']>;

interface AuthState {
  user: User | null;
  loading: boolean;
  error: string;
  status: 'checking' | 'authenticated' | 'not-authenticated';
  currentRequestId: undefined | string;
}

const initialState: AuthState = {
  user: null,
  loading: false,
  status: 'checking',
  error: '',
  currentRequestId: undefined,
};
const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(signUp.fulfilled, state => {
        state.loading = false;
      })
      .addCase(verifyOtpSignUp.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.status = 'authenticated';
      })
      .addMatcher<PendingAction>(
        (action: AnyAction): action is PendingAction =>
          action.type.endsWith('/pending'),
        (state, action) => {
          state.loading = true;
          state.currentRequestId = action.meta.requestId;
        },
      )
      .addMatcher<RejectedAction>(
        (action: AnyAction): action is RejectedAction =>
          action.type.endsWith('/rejected'),
        (state, action) => {
          if (
            state.currentRequestId === action.meta.requestId &&
            state.loading === true
          ) {
            state.loading = false;
          }
        },
      )
      .addMatcher<FulfilledAction>(
        (action: AnyAction): action is FulfilledAction =>
          action.type.endsWith('/fulfilled'),
        (state, action) => {
          if (
            state.currentRequestId === action.meta.requestId &&
            state.loading === true
          ) {
            state.loading = false;
          }
        },
      );
  },
});

export default authSlice.reducer;
