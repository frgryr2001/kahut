import {Question} from './kahoot.type';

interface AssignmentSummary {
  id: number;
  kahootId: number;
  pin: string;
  expiredAt: number;
  createdAt: number;
  coverImage: string | null;
  title: string;
  visibleScope: string;
  userId: number;
  username: string;
  userImage: string;
  numberOfQuestion: number;
}

interface AssignmentDetail {
  id: number;
  kahootId?: number;
  isPlayed: boolean;
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
  usersFavorite: Array<{userId: number}>;
  questions: Array<Question>;
  isMyKahoot?: boolean;
  playId?: number;
  assignmentId?: number;
}

export type {AssignmentSummary, AssignmentDetail};
