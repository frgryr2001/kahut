import {RootState} from '../../store';
export const selectLoading = (state: RootState) => state.auth.loading;
export const selectStatus = (state: RootState) => state.auth.status;
