import {AnyAction, AsyncThunk, createSlice} from '@reduxjs/toolkit';
import {User} from '../../../types/user';
import {
  logOut,
  //   refreshToken,
  resendCodeOtp,
  signUp,
  verifyOtpSignUp,
} from './actions';

type GenericAsyncThunk = AsyncThunk<unknown, unknown, any>;

type PendingAction = ReturnType<GenericAsyncThunk['pending']>;
type RejectedAction = ReturnType<GenericAsyncThunk['rejected']>;
type FulfilledAction = ReturnType<GenericAsyncThunk['fulfilled']>;

interface AuthState {
  user: User | null;
  loading: boolean;
  loadingResend?: boolean;
  error: string;
  status: 'checking' | 'authenticated' | 'not-authenticated';
  currentRequestId: undefined | string;
}

const initialState: AuthState = {
  user: null,
  loading: false,
  loadingResend: false,
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
      .addCase(resendCodeOtp.fulfilled, state => {
        state.loadingResend = false;
      })
      .addCase(logOut.fulfilled, state => {
        state.user = null;
        state.status = 'not-authenticated';
      })
      //   .addCase(refreshToken.fulfilled, (state, action) => {
      //     state.user!.access_token = action.payload.access_token;
      //     state.status = 'authenticated';
      //   })
      .addMatcher<PendingAction>(
        (action: AnyAction): action is PendingAction => {
          if (action.type.endsWith('resendCodeOtp/pending')) {
            return false;
          }
          return action.type.endsWith('/pending');
        },
        (state, action) => {
          state.loading = true;
          state.currentRequestId = action.meta.requestId;
        },
      )

      .addMatcher<RejectedAction>(
        (action: AnyAction): action is RejectedAction => {
          if (action.type.endsWith('resendCodeOtp/rejected')) {
            return false;
          }
          return action.type.endsWith('/rejected');
        },
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
      )
      .addMatcher<PendingAction>(
        (action: AnyAction): action is PendingAction =>
          action.type.endsWith('resendCodeOtp/pending'),
        (state, action) => {
          state.loadingResend = true;
          state.currentRequestId = action.meta.requestId;
        },
      )
      .addMatcher<RejectedAction>(
        (action: AnyAction): action is RejectedAction =>
          action.type.endsWith('resendCodeOtp/rejected'),
        (state, action) => {
          state.loadingResend = false;
          state.currentRequestId = action.meta.requestId;
        },
      );
  },
});

export default authSlice.reducer;
