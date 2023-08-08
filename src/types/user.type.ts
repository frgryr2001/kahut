import {KahootSummary} from './kahoot.type';

interface UserSummary {
  id: number;
  name: string;
  kahoots: KahootSummary[];
}

export type {UserSummary};
