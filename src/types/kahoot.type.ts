interface KahootSummary {
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

export type {KahootSummary};
