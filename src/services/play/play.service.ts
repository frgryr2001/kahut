import httpClient from '../utils/httpClient';
import {RequestResponse} from '../../types/common';
import {PlaySummary} from '../../types/play.type';

const getPlaysList = async () => {
  try {
    const response = await httpClient.get<RequestResponse<PlaySummary[]>>(
      '/plays',
    );
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

import {IPlayData} from '../../types/play';
export const postResultPlayOfUser = async (data: IPlayData) => {
  const response = await httpClient.post<RequestResponse<{}>>({
    url: '/plays',
    data,
  });
  return response;
};

export {getPlaysList};
