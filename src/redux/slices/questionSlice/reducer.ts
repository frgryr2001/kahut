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
      action: PayloadAction<{idQuestion: string | number; theme: Theme}>,
    ) {
      const {idQuestion, theme} = action.payload;
      const question = state.questions.find(
        ques => ques.idQuestion === idQuestion,
      );
      if (question) {
        question.theme = theme;
        question.flag = 'edited';
      }
    },
    addQuestion(
      state,
      action: PayloadAction<{
        idQuestion: string | number;
        question: QuestionKahoot;
      }>,
    ) {
      const {idQuestion, question} = action.payload;
      const ques = state.questions.find(q => q.idQuestion === idQuestion);
      if (ques) {
        question.flag = 'added';
        ques.questions.push(question as never);
      }
    },
    addTitleQuestion(
      state,
      action: PayloadAction<{
        kahootId: string | number;
        questionId: string | number;
        titleQuestion: string;
      }>,
    ) {
      const {kahootId, questionId, titleQuestion} = action.payload;
      const kahoot = state.questions.find(k => k.idQuestion === kahootId);
      if (kahoot) {
        const question = kahoot.questions.find(q => q.id === questionId);
        if (question) {
          question.question = titleQuestion;
          if (question.flag === 'added') {
            question.flag = 'added';
          }
        }
      }
    },
    addImageQuestion(
      state,
      action: PayloadAction<{
        kahootId: string | number;
        questionId: string | number;
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
          if (question.flag === 'added') {
            question.media = imageQuestion;
            kahoot.images?.push(file);
            question.flag = 'added';
          } else {
            question.media = imageQuestion;
            kahoot.images?.push(file);
            question.flag = 'edited';
          }
        }
      }
    },
    deleteImageQuestion(
      state,
      action: PayloadAction<{
        kahootId: string | number;
        questionId: string | number;
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
        kahootId: string | number;
        questionId: string | number;
        answer: string;
        index: number;
      }>,
    ) {
      const {kahootId, questionId, answer, index} = action.payload;
      const kahoot = state.questions.find(k => k.idQuestion === kahootId);
      if (kahoot) {
        const question = kahoot.questions.find(q => q.id === questionId);

        if (question) {
          if (question.answers[index] !== undefined) {
            if (question.answers[index].flag === 'added') {
              question.answers[index] = {
                ...question.answers[index],
                text: answer,
                flag: 'added',
              };
            } else {
              question.answers[index] = {
                ...question.answers[index],
                text: answer,
                flag: 'edited',
              };
            }
          } else {
            question.answers[index] = {
              text: answer,
              flag: 'added',
              isCorrect: false,
            };
          }
        }

        // if (question?.answers[index].isCorrect === undefined) {
        //   question!.answers[index] = {
        //     ...question?.answers[index],
        //     isCorrect: false,
        //     flag: 'edited',
        //   };
        // }
      }
    },
    changeIsCorrectAnswerQuestion(
      state,
      action: PayloadAction<{
        kahootId: string | number;
        questionId: string | number;
        index: number;
        isCorrect: boolean;
      }>,
    ) {
      const {kahootId, questionId, index, isCorrect} = action.payload;
      const kahoot = state.questions.find(k => k.idQuestion === kahootId);
      if (kahoot) {
        const question = kahoot.questions.find(q => q.id === questionId);
        if (question) {
          if (question.flag === 'added') {
            question.answers[index] = {
              ...question.answers[index],
              isCorrect,
              flag: 'added',
            };
            question.flag = 'added';
          } else {
            if (question.answers[index].flag === 'added') {
              question.answers[index] = {
                ...question.answers[index],
                isCorrect,
                flag: 'added',
              };
            } else {
              question.answers[index] = {
                ...question.answers[index],
                isCorrect,
                flag: 'edited',
              };
            }
            question.flag = 'edited';
          }
        }
      }
    },
    deleteAnswerQuestion(
      state,
      action: PayloadAction<{
        kahootId: string | number;
        questionId: string | number;
        index: number;
        idAnswer: number;
      }>,
    ) {
      const {kahootId, questionId, index, idAnswer} = action.payload;
      const kahoot = state.questions.find(k => k.idQuestion === kahootId);
      if (kahoot) {
        const question = kahoot.questions.find(q => q.id === questionId);
        if (question) {
          question.answers.splice(index, 1);
          kahoot?.deletedAnswerIds?.push(idAnswer);
        }
      }
    },
    addImageAnswerQuestion(
      state,
      action: PayloadAction<{
        kahootId: string | number;
        questionId: string | number;
        index: number;
        image: string; // name of image
        file: {
          uri: string;
          type: string;
          name: string;
        };
      }>,
    ) {
      const {kahootId, questionId, index, image, file} = action.payload;
      const kahoot = state.questions.find(k => k.idQuestion === kahootId);
      if (kahoot) {
        const question = kahoot.questions.find(q => q.id === questionId);
        if (question) {
          question.answers[index] = {
            ...question.answers[index],
            image: image,
          };
          kahoot.images?.push(file);
        }
      }
    },
    // clean code
    updateFieldQuestion(
      state,
      action: PayloadAction<{
        kahootId: string | number;
        questionId: string | number;
        fieldsToUpdate: Partial<QuestionKahoot>;
      }>,
    ) {
      const {kahootId, questionId, fieldsToUpdate} = action.payload;
      const kahoot = state.questions.find(k => k.idQuestion === kahootId);
      if (kahoot) {
        const question = kahoot.questions.find(q => q.id === questionId);
        if (question) {
          Object.assign(question, fieldsToUpdate);
          question.flag = 'edited';
        }
      }
    },
    deleteQuestion(
      state,
      action: PayloadAction<{
        kahootId: string | number;
        questionId: string | number;
      }>,
    ) {
      const {kahootId, questionId} = action.payload;
      const kahoot = state.questions.find(k => k.idQuestion === kahootId);
      if (kahoot) {
        const question = kahoot.questions.find(q => q.id === questionId);
        if (question) {
          kahoot.questions = kahoot.questions.filter(q => q.id !== questionId);
          kahoot.deletedQuestionIds?.push(questionId as number);
        }
      }
    },

    // Kahoot
    addImageCoverKahoot(
      state,
      action: PayloadAction<{
        kahootId: string | number;
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
        kahoot.flag = 'edited';
        kahoot.images?.push(file);
      }
    },
    deleteImageCoverKahoot(
      state,
      action: PayloadAction<{kahootId: string | number}>,
    ) {
      const {kahootId} = action.payload;
      const kahoot = state.questions.find(k => k.idQuestion === kahootId);
      if (kahoot) {
        kahoot.coverImage = '';
      }
    },
    addTitleKahoot(
      state,
      action: PayloadAction<{
        kahootId: string | number;
        titleKahoot: string;
      }>,
    ) {
      const {kahootId, titleKahoot} = action.payload;
      const kahoot = state.questions.find(k => k.idQuestion === kahootId);
      if (kahoot) {
        kahoot.title = titleKahoot;
        kahoot.flag = 'edited';
      }
    },
    updateKahoot(
      state,
      action: PayloadAction<{
        kahootId: string | number;
        fieldsToUpdate: Partial<Question>;
      }>,
    ) {
      const {kahootId, fieldsToUpdate} = action.payload;
      const kahoot = state.questions.find(k => k.idQuestion === kahootId);
      if (kahoot) {
        Object.assign(kahoot, fieldsToUpdate);
        kahoot.flag = 'edited';
      }
    },
    updateImagesKahoot(
      state,
      action: PayloadAction<{
        kahootId: string | number;
        image: string;
      }>,
    ) {
      const {kahootId, image} = action.payload;
      const kahoot = state.questions.find(k => k.idQuestion === kahootId);
      if (kahoot) {
        //  remove image in array images
        kahoot.images = kahoot.images?.filter(img => img.name !== image);
      }
    },
    deleteKahoot(state, action: PayloadAction<{kahootId: string | number}>) {
      const {kahootId} = action.payload;
      const index = state.questions.findIndex(
        kahoot => kahoot.idQuestion === kahootId,
      );
      if (index !== -1) {
        state.questions.splice(index, 1);
      }
    },
    addKahoot(
      state,
      action: PayloadAction<{
        kahoot: Question;
        indexOfKahootInEdit: number;
      }>,
    ) {
      const {kahoot, indexOfKahootInEdit} = action.payload;
      if (indexOfKahootInEdit === -1) {
        state.questions.push(kahoot);
        return;
      }
      if (state.questions.length === 0) {
        state.questions.push(kahoot);
        return;
      }
      state.questions.splice(indexOfKahootInEdit, 0, kahoot);
    },
  },
  extraReducers: builder => {
    builder
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
  deleteAnswerQuestion,
  // Kahoot
  addImageCoverKahoot,
  deleteImageCoverKahoot,
  addTitleKahoot,
  updateKahoot,
  deleteKahoot,
  addKahoot,
  updateImagesKahoot,
} = questionSlice.actions;

export default questionSlice.reducer;
