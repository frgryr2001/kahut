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

export {getPlaysList};
