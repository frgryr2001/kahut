import {RootState} from '../../store';
export const selectLoadingResend = (state: RootState) =>
  state.auth.loadingResend;
export const selectLoading = (state: RootState) => state.auth.loading;
export const selectStatus = (state: RootState) => state.auth.status;
export const selectToken = (state: RootState) => state.auth.user?.access_token;
export const selectUser = (state: RootState) => state.auth.user;
