import {
  AnyAction,
  AsyncThunk,
  PayloadAction,
  createSlice,
} from '@reduxjs/toolkit';
import {
  Question,
  QuestionKahoot,
  theme as Theme,
} from '../../../types/question';
import {createKahoot} from './action';
type GenericAsyncThunk = AsyncThunk<unknown, unknown, any>;

type PendingAction = ReturnType<GenericAsyncThunk['pending']>;
type RejectedAction = ReturnType<GenericAsyncThunk['rejected']>;
type FulfilledAction = ReturnType<GenericAsyncThunk['fulfilled']>;
interface QuestionState {
  questions: Question[];
  loading: boolean;
  error: string | null;
  currentRequestId: string | undefined;
}

const initialState: QuestionState = {
  questions: [],
  loading: false,
  error: null,
  currentRequestId: undefined,
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
        file: {
          uri: string;
          type: string;
          name: string;
        };
      }>,
    ) {
      const {kahootId, questionId, imageQuestion, file} = action.payload;
      const kahoot = state.questions.find(k => k.idQuestion === kahootId);
      if (kahoot) {
        const question = kahoot.questions.find(q => q.id === questionId);
        if (question) {
          question.media = imageQuestion;
          kahoot.images?.push(file);
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
    addTextAnswerQuestion(
      state,
      action: PayloadAction<{
        kahootId: string;
        questionId: string;
        answer: string;
        index: number;
      }>,
    ) {
      const {kahootId, questionId, answer, index} = action.payload;
      const kahoot = state.questions.find(k => k.idQuestion === kahootId);
      if (kahoot) {
        const question = kahoot.questions.find(q => q.id === questionId);

        if (question) {
          question.answers[index] = {
            ...question.answers[index],
            text: answer,
          };
        }
        if (question?.answers[index].isCorrect === undefined) {
          question!.answers[index] = {
            ...question?.answers[index],
            isCorrect: false,
          };
        }
      }
    },
    changeIsCorrectAnswerQuestion(
      state,
      action: PayloadAction<{
        kahootId: string;
        questionId: string;
        index: number;
        isCorrect: boolean;
      }>,
    ) {
      const {kahootId, questionId, index, isCorrect} = action.payload;
      const kahoot = state.questions.find(k => k.idQuestion === kahootId);
      if (kahoot) {
        const question = kahoot.questions.find(q => q.id === questionId);
        if (question) {
          question.answers[index] = {
            ...question.answers[index],
            isCorrect,
          };
        }
      }
    },
    addImageAnswerQuestion(
      state,
      action: PayloadAction<{
        kahootId: string;
        questionId: string;
        index: number;
        image: string; // name of image
      }>,
    ) {
      const {kahootId, questionId, index, image} = action.payload;
      const kahoot = state.questions.find(k => k.idQuestion === kahootId);
      if (kahoot) {
        const question = kahoot.questions.find(q => q.id === questionId);
        if (question) {
          question.answers[index] = {
            ...question.answers[index],
            image: image,
          };
          kahoot.images?.push(image);
        }
      }
    },
    // clean code
    updateFieldQuestion(
      state,
      action: PayloadAction<{
        kahootId: string;
        questionId: string;
        fieldsToUpdate: Partial<QuestionKahoot>;
      }>,
    ) {
      const {kahootId, questionId, fieldsToUpdate} = action.payload;
      const kahoot = state.questions.find(k => k.idQuestion === kahootId);
      if (kahoot) {
        const question = kahoot.questions.find(q => q.id === questionId);
        if (question) {
          Object.assign(question, fieldsToUpdate);
        }
      }
    },
    deleteQuestion(
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
          kahoot.questions = kahoot.questions.filter(q => q.id !== questionId);
        }
      }
    },

    // Kahoot
    addImageCoverKahoot(
      state,
      action: PayloadAction<{
        kahootId: string;
        imageCover: string;
        file: {
          uri: string;
          type: string;
          name: string;
        };
      }>,
    ) {
      const {kahootId, imageCover, file} = action.payload;
      const kahoot = state.questions.find(k => k.idQuestion === kahootId);
      if (kahoot) {
        kahoot.coverImage = imageCover;
        kahoot.images?.push(file);
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
    updateKahoot(
      state,
      action: PayloadAction<{
        kahootId: string;
        fieldsToUpdate: Partial<Question>;
      }>,
    ) {
      const {kahootId, fieldsToUpdate} = action.payload;
      const kahoot = state.questions.find(k => k.idQuestion === kahootId);
      if (kahoot) {
        Object.assign(kahoot, fieldsToUpdate);
      }
    },
    deleteKahoot(state, action: PayloadAction<{kahootId: string}>) {
      const {kahootId} = action.payload;
      const index = state.questions.findIndex(
        kahoot => kahoot.idQuestion === kahootId,
      );
      if (index !== -1) {
        state.questions.splice(index, 1);
      }
    },
  },
  extraReducers: builder => {
    builder
      .addCase(createKahoot.fulfilled, (state, action) => {
        state.questions.push(action.payload);
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

export const {
  initQuestion,
  changeTheme,
  addQuestion,
  addTitleQuestion,
  addImageQuestion,
  deleteImageQuestion,
  addTextAnswerQuestion,
  changeIsCorrectAnswerQuestion,
  addImageAnswerQuestion,
  updateFieldQuestion,
  deleteQuestion,
  // Kahoot
  addImageCoverKahoot,
  deleteImageCoverKahoot,
  addTitleKahoot,
  updateKahoot,
  deleteKahoot,
} = questionSlice.actions;

export default questionSlice.reducer;
