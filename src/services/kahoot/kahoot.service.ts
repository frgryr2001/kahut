import httpClient from '../utils/httpClient';
import {RequestResponse} from '../../types/common';
import {SummaryKahoot} from '../../types/kahoot.type';

const getKahootsList = async () => {
  try {
    const response = await httpClient.get<RequestResponse<SummaryKahoot[]>>(
      '/kahoots/list',
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

const getOwnKahootsList = async () => {
  try {
    const response = await httpClient.get<RequestResponse<SummaryKahoot[]>>(
      '/kahoots/list/own',
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

export {getKahootsList, getOwnKahootsList};
