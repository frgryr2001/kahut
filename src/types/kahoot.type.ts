interface SummaryKahoot {
  id: number;
  title: string;
  coverImage: string | null;
  userImage: string;
  username: string;
  numberOfQuestion: number;
  createdAt?: number;
  visibleScope?: string;
}

export type {SummaryKahoot};