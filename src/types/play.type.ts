interface PlaySummary {
  id: number;
  userId: number;
  createdAt: number;
  kahootId: number | null;
  kahootTitle: string;
  assignmentId: number | null;
  numberOfPlayer: number;
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
  }>;
}

export type {PlaySummary, PlayDetail};
