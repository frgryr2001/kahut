import {RootState} from '../../store';

export const selectThemeCreateQuestion = (state: RootState) =>
  state.questions.theme;
