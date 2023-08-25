import httpClient from '../utils/httpClient';
import {RequestResponse} from '../../types/common';
import {
  IKahootDetail,
  IGetKaHootsListResponseData,
  KahootDetailData,
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

const getPublicKahootsList = async () => {
  try {
    const url = '/kahoots/list';
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

const getFavoriteKahootsList = async ({
  page,
  limit,
}: {
  page: number;
  limit: number;
}) => {
  try {
    const response = await httpClient.get<
      RequestResponse<IGetKaHootsListResponseData>
    >(`/favorites?page=${page}&limit=${limit}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

const getSharedKahootsList = async ({
  page,
  limit,
}: {
  page: number;
  limit: number;
}) => {
  try {
    const response = await httpClient.get<
      RequestResponse<IGetKaHootsListResponseData>
    >(`/shared?page=${page}&limit=${limit}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

const getKahootDetail = async (kahootId: number): Promise<KahootDetailData> => {
  try {
    const response = await httpClient.get<IKahootDetail>(
      `/kahoots/detail/${kahootId}`,
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

const deleteKahootById = async (
  kahootId: number,
): Promise<RequestResponse<number>> => {
  try {
    const response = await httpClient.delete<RequestResponse<number>>(
      `/kahoots/${kahootId}`,
    );

    return response;
  } catch (error) {
    throw error;
  }
};

const postUserFavoriteKahoot = async (
  kahootId: number,
  userId: number,
): Promise<RequestResponse<number>> => {
  try {
    const response = await httpClient.post<RequestResponse<number>>({
      url: '/favorites',
      data: {
        kahootId,
        userId,
      },
      config: {
        headers: {
          'Content-Type': 'application/json',
        },
      },
    });
    console.log('response', response);

    return response;
  } catch (error) {
    throw error;
  }
};

const deleteUserFavoriteKahoot = async (
  kahootId: number,
): Promise<RequestResponse<number>> => {
  try {
    const response = await httpClient.delete<RequestResponse<number>>(
      '/favorites',
      {
        headers: {
          'Content-Type': 'application/json',
        },
        data: {
          kahootId,
        },
      },
    );

    return response;
  } catch (error) {
    throw error;
  }
};

export {
  getKahootsList,
  getPublicKahootsList,
  getOwnKahootsList,
  getFavoriteKahootsList,
  getSharedKahootsList,
  getKahootDetail,
  deleteKahootById,
  postUserFavoriteKahoot,
  deleteUserFavoriteKahoot,
};
