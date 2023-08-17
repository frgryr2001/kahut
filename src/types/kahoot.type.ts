export interface KahootSummary {
  id: number;
  title: string;
  coverImage: string | null;
  userImage: string;
  username: string;
  numberOfQuestion: number;
  createdAt?: number;
  visibleScope?: string;
  isDraft?: boolean;
}

export interface IGetKaHootsListResponseData {
  kahoots: KahootSummary[];
  is_over: boolean;
}

export interface IKahootDetail {
  code: number;
  success: boolean;
  data: KahootDetailData;
  message: string;
}

export interface KahootDetailData {
  id: number;
  userId: number;
  username: string;
  userImage: string;
  coverImage: string;
  title: string;
  theme: string;
  description: string;
  media: string;
  visibleScope: string;
  numberOfPlayer: number;
  usersFavorite: {
    userId: number;
  }[];
  questions: Question[];
  isMyKahoot?: boolean;
}

export interface Question {
  id: number;
  type: string;
  media: string;
  timeLimit: number;
  point: number;
  question: string;
  answer: null;
  inOrder?: number;
  answers: Answer[];
}

export interface Answer {
  id: number;
  text: string;
  image: null | string;
  isCorrect: number;
  inOrder: number;
}
