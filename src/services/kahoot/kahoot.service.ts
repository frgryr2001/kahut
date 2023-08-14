import httpClient from '../utils/httpClient';
import {RequestResponse} from '../../types/common';
import {
  IKahootDetail,
  IGetKaHootsListResponseData,
} from '../../types/kahoot.type';

const getKahootsList = async () => {
  try {
    const response = await httpClient.get<
      RequestResponse<IGetKaHootsListResponseData>
    >('/kahoots/list');
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

const deleteKahootById = async (kahootId: number) => {
  try {
    const response = await httpClient.delete<RequestResponse<number>>(
      `/kahoots/${kahootId}`,
    );
    return response;
  } catch (error) {
    throw error;
  }
};

export {getKahootsList, getOwnKahootsList, getKahootDetail, deleteKahootById};
