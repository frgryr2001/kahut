import {PayloadAction, createSlice} from '@reduxjs/toolkit';
import {theme} from '../../../types/question';

interface QuestionState {
  theme: theme;
}

const initialState: QuestionState = {
  theme: 'Standard',
};
const questionSlice = createSlice({
  name: 'question',
  initialState,
  reducers: {
    choiceTheme: (state, action: PayloadAction<theme>) => {
      state.theme = action.payload;
    },
  },
});

export const {choiceTheme} = questionSlice.actions;

export default questionSlice.reducer;
