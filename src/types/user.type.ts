import {KahootSummary} from './kahoot.type';

interface UserSummary {
  id: number;
  name: string;
  kahoots: KahootSummary[];
}

interface UserDetail {
  id: number;
  name: string;
  image: string;
  numberOfKahoots: number;
  numberOfPlays: number;
  numberOfPlayers: number;
}

export type {UserSummary, UserDetail};
