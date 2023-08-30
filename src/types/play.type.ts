interface PlaySummary {
  id: number;
  userId: number;
  createdAt: number;
  kahootId: number | null;
  kahootTitle: string;
  assignmentId: number | null;
  numberOfPlayer: number;
  type: PlayType;
  point: number;
}

enum PlayType {
  practice = 'practice',
  assignment = 'assignment',
}

interface PlayDetail {
  id: number;
  kahootId: number;
  point: number;
  title: string;
  coverImage: string;
  answers: Array<{
    type: string;
    inOrder: number;
    media: string;
    question: string;
    userAnswer: {
      id: number;
      text?: string;
      image?: string;
    };
    correctAnswer: {
      id: number;
      text?: string;
      image?: string;
    };
    isCorrect: boolean;
    point: number;
  }>;
  topPlayers: Array<{
    id: number;
    userId: number;
    point: number;
    username: string;
    userImage: string;
  }>;
}

interface Player {
  id: number;
  userId: number;
  point: number;
  username: string;
  userImage: string;
}

export type {PlaySummary, PlayDetail, Player};
