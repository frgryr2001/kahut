import httpClient from '../utils/httpClient';
import {RequestResponse} from '../../types/common';
import {PlayDetail, PlaySummary} from '../../types/play.type';
import {IPlayData} from '../../types/play';

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

const getPlayDetail = async ({
  id,
  kahootId,
  assignmentId,
}: {
  id: number;
  kahootId: number;
  assignmentId?: number;
}) => {
  try {
    const response = await httpClient.get<RequestResponse<PlayDetail>>(
      assignmentId
        ? `/plays/${id}?assignmentId=${assignmentId}`
        : `/plays/${id}?kahootId=${kahootId}`,
    );
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const postResultPlayOfUser = async (data: IPlayData) => {
  const response = await httpClient.post<
    RequestResponse<{
      id: number;
      kahootId: number;
      assignmentId: number;
    }>
  >({
    url: '/plays',
    data,
  });
  return response;
};

export {getPlaysList, getPlayDetail};
