import {KahootSummary} from './kahoot.type';

interface UserSummary {
  id: number;
  username: string;
  kahoots: KahootSummary[];
}

interface UserDetail {
  id: number;
  username: string;
  image: string;
  numberOfKahoots: number;
  numberOfPlays: number;
  numberOfPlayers: number;
}

export type {UserSummary, UserDetail};
