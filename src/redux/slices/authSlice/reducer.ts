import {
  AnyAction,
  AsyncThunk,
  PayloadAction,
  createSlice,
} from '@reduxjs/toolkit';
import {User} from '../../../types/user';
import {
  signOut,
  resendCodeOtp,
  signIn,
  signInWithGoogle,
  sendOtp,
  verifyOtpSignUp,
  resetPassword,
} from './actions';
import {NewAccessToken} from '../../../types/common';

type GenericAsyncThunk = AsyncThunk<unknown, unknown, any>;

type PendingAction = ReturnType<GenericAsyncThunk['pending']>;
type RejectedAction = ReturnType<GenericAsyncThunk['rejected']>;
type FulfilledAction = ReturnType<GenericAsyncThunk['fulfilled']>;

interface AuthState {
  user: User | null;
  loading: boolean;
  loadingResend?: boolean;
  loadingScreen: boolean;
  error: string;
  status: 'authenticated' | 'not-authenticated';
  currentRequestId: undefined | string;
}

const initialState: AuthState = {
  user: null,
  loading: false,
  loadingResend: false,
  loadingScreen: false,
  status: 'not-authenticated',
  error: '',
  currentRequestId: undefined,
};
const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginSuccessNewAccessToken: (
      state,
      action: PayloadAction<NewAccessToken>,
    ) => {
      if (state.user) {
        state.user.access_token = action.payload.access_token;
        state.user.refresh_token = action.payload.access_token;
      }
    },
  },
  extraReducers(builder) {
    builder
      .addCase(sendOtp.fulfilled, state => {
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
      .addCase(signOut.fulfilled, state => {
        state.user = null;
        state.status = 'not-authenticated';
        state.currentRequestId = undefined;
        state.loading = false;
      })
      .addCase(signIn.fulfilled, (state, action) => {
        state.user = action.payload;
        state.status = 'authenticated';
      })
      .addCase(signInWithGoogle.pending, state => {
        state.loadingScreen = true;
      })
      .addCase(signInWithGoogle.fulfilled, (state, action) => {
        state.user = action.payload;
        state.status = 'authenticated';
        state.loadingScreen = false;
      })
      .addCase(signInWithGoogle.rejected, state => {
        state.loadingScreen = false;
      })
      .addCase(resetPassword.fulfilled, () => {})
      .addMatcher<PendingAction>(
        (action: AnyAction): action is PendingAction => {
          if (
            action.type.endsWith('resendCodeOtp/pending') ||
            action.type.endsWith('signInWithGoogle/pending')
          ) {
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

export const {loginSuccessNewAccessToken: loginSuccessNewAccessTokenAction} =
  authSlice.actions;

export default authSlice.reducer;
