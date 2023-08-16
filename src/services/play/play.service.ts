import httpClient from '../utils/httpClient';
import {RequestResponse} from '../../types/common';
import {IPlayData} from '../../types/play';
export const postResultPlayOfUser = async (data: IPlayData) => {
  const response = await httpClient.post<RequestResponse<{}>>({
    url: '/plays',
    data,
  });
  return response;
};
