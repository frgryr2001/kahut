import {PayloadAction, createSlice} from '@reduxjs/toolkit';
import {
  Question,
  QuestionKahoot,
  theme as Theme,
} from '../../../types/question';

interface QuestionState {
  questions: Question[];
  loading: boolean;
  error: string | null;
}

const initialState: QuestionState = {
  questions: [],
  loading: false,
  error: null,
};
const questionSlice = createSlice({
  name: 'questions',
  initialState,
  reducers: {
    initQuestion(state, action: PayloadAction<Question>) {
      state.questions.push({...action.payload});
    },
    changeTheme(
      state,
      action: PayloadAction<{idQuestion: string; theme: Theme}>,
    ) {
      const {idQuestion, theme} = action.payload;
      const question = state.questions.find(
        ques => ques.idQuestion === idQuestion,
      );
      if (question) {
        question.theme = theme;
      }
    },
    addQuestion(
      state,
      action: PayloadAction<{idQuestion: string; question: QuestionKahoot}>,
    ) {
      const {idQuestion, question} = action.payload;
      const ques = state.questions.find(q => q.idQuestion === idQuestion);
      if (ques) {
        ques.questions.push(question as never);
      }
    },
    addTitleQuestion(
      state,
      action: PayloadAction<{
        kahootId: string;
        questionId: string;
        titleQuestion: string;
      }>,
    ) {
      const {kahootId, questionId, titleQuestion} = action.payload;
      const kahoot = state.questions.find(k => k.idQuestion === kahootId);
      if (kahoot) {
        const question = kahoot.questions.find(q => q.id === questionId);
        if (question) {
          question.question = titleQuestion;
        }
      }
    },
    addImageQuestion(
      state,
      action: PayloadAction<{
        kahootId: string;
        questionId: string;
        imageQuestion: string;
      }>,
    ) {
      const {kahootId, questionId, imageQuestion} = action.payload;
      const kahoot = state.questions.find(k => k.idQuestion === kahootId);
      if (kahoot) {
        const question = kahoot.questions.find(q => q.id === questionId);
        if (question) {
          question.media = imageQuestion;
        }
      }
    },
    deleteImageQuestion(
      state,
      action: PayloadAction<{
        kahootId: string;
        questionId: string;
      }>,
    ) {
      const {kahootId, questionId} = action.payload;
      const kahoot = state.questions.find(k => k.idQuestion === kahootId);
      if (kahoot) {
        const question = kahoot.questions.find(q => q.id === questionId);
        if (question) {
          question.media = '';
        }
      }
    },
    // Kahoot
    addImageCoverKahoot(
      state,
      action: PayloadAction<{
        kahootId: string;
        imageCover: string;
      }>,
    ) {
      const {kahootId, imageCover} = action.payload;
      const kahoot = state.questions.find(k => k.idQuestion === kahootId);
      if (kahoot) {
        kahoot.coverImage = imageCover;
      }
    },
    deleteImageCoverKahoot(state, action: PayloadAction<{kahootId: string}>) {
      const {kahootId} = action.payload;
      const kahoot = state.questions.find(k => k.idQuestion === kahootId);
      if (kahoot) {
        kahoot.coverImage = '';
      }
    },
    addTitleKahoot(
      state,
      action: PayloadAction<{
        kahootId: string;
        titleKahoot: string;
      }>,
    ) {
      const {kahootId, titleKahoot} = action.payload;
      const kahoot = state.questions.find(k => k.idQuestion === kahootId);
      if (kahoot) {
        kahoot.title = titleKahoot;
      }
    },
  },
});

export const {
  initQuestion,
  changeTheme,
  addQuestion,
  addTitleQuestion,
  addImageQuestion,
  deleteImageQuestion,
  // Kahoot
  addImageCoverKahoot,
  deleteImageCoverKahoot,
  addTitleKahoot,
} = questionSlice.actions;

export default questionSlice.reducer;
