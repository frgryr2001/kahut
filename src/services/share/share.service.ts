import {RequestResponse} from '../../types/common';
import httpClient from '../utils/httpClient';

export const createShare = async (kahootId: number, usernames: string[]) => {
  const response = await httpClient.post<RequestResponse<{}>>({
    url: '/shared',
    data: {
      kahootId,
      usernames,
    },
    config: {
      headers: {
        'Content-Type': 'application/json',
      },
    },
  });
  return response;
};
