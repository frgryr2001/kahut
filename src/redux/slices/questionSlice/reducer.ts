import {PayloadAction, createSlice} from '@reduxjs/toolkit';
import {theme} from '../../../types/question';

type Question = {
  theme: string;
};
interface QuestionState {
  question: Question;
}

const initialState: QuestionState = {
  question: {
    theme: 'Standard',
  },
};
const questionSlice = createSlice({
  name: 'question',
  initialState,
  reducers: {
    choiceTheme: (state, action: PayloadAction<theme>) => {
      state.question.theme = action.payload;
    },
  },
});

export const {choiceTheme} = questionSlice.actions;

export default questionSlice.reducer;
