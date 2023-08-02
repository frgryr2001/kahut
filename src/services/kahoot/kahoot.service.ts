import httpClient from '../utils/httpClient';
import {RequestResponse} from '../../types/common';
import {SummaryKahoot} from '../../types/kahoot.type';

const getKahootsList = async () => {
  const response = await httpClient.get<RequestResponse<SummaryKahoot[]>>(
    '/kahoots/list',
  );
  return response.data;
};

const getOwnKahootsList = async () => {
  const response = await httpClient.get<RequestResponse<SummaryKahoot[]>>(
    '/kahoots/list/own',
  );
  return response.data;
};

export {getKahootsList, getOwnKahootsList};
