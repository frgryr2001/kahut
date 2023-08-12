import httpClient from '../utils/httpClient';
import {RequestResponse} from '../../types/common';
import {
  IKahootDetail,
  IGetKaHootsListResponseData,
} from '../../types/kahoot.type';

const getKahootsList = async ({userId}: {userId?: number}) => {
  try {
    const url = `/kahoots/list?limit=999&${userId ? `userId=${userId}` : ''}`;
    const response = await httpClient.get<
      RequestResponse<IGetKaHootsListResponseData>
    >(url);
    return response.data;
  } catch (error) {
    throw error;
  }
};

const getOwnKahootsList = async (page: number) => {
  try {
    const response = await httpClient.get<
      RequestResponse<IGetKaHootsListResponseData>
    >(`/kahoots/list/own?page=${page}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

const getKahootDetail = async (kahootId: number) => {
  try {
    const response = await httpClient.get<IKahootDetail>(
      `/kahoots/detail/${kahootId}`,
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

export {getKahootsList, getOwnKahootsList, getKahootDetail};
