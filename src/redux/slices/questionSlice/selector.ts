import {createSelector} from 'reselect';
import {RootState} from '../../store';

export const selectQuestions = (state: RootState) => state.kahoot.questions;

export const selectTheme = createSelector(selectQuestions, questions =>
  questions.map(question => question.theme),
);
