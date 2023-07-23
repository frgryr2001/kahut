export type theme =
  | 'Standard'
  | 'Spring'
  | 'Summer'
  | 'Autumn'
  | 'Winter'
  | 'Dark';

export type Question = {
  type: string;
  media: string;
  timeLimit: number;
  points: number;
  question: string;
  answer: [
    {
      answer: string;
      isCorrect: boolean;
      image: string;
    },
  ];
};

export type colorAnswer = 'red' | 'blue' | 'green' | 'yellow';
