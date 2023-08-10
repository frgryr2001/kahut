export type theme =
  | 'Standard'
  | 'Spring'
  | 'Summer'
  | 'Autumn'
  | 'Winter'
  | 'Pride';

export type QuestionKahoot = {
  id?: string | number;
  type: 'quiz' | 'trueorfalse';
  media: string;
  timeLimit: number;
  point: 0 | 1000 | 2000;
  question: string;
  answer?: boolean | null;
  answers:
    | [
        {
          id?: number;
          text?: string;
          isCorrect: boolean;
          image?: string;
        },
      ]
    | [];
};
export type Question = {
  idQuestion?: string | number;
  userId?: number;
  coverImage: string | null;
  title: string;
  theme: theme;
  description: string;
  media: string;
  visibleScope: 'public' | 'private';
  questions: QuestionKahoot[] | [];
  isDraft?: boolean;
  images?: any[];
  createdAt?: string;
};

export type QuestionKahootType = keyof Question;

export type KeyTypeKahoot<T extends keyof Question> = {
  [P in T]: Question[P];
};

export type colorAnswer = 'red' | 'blue' | 'green' | 'yellow';
