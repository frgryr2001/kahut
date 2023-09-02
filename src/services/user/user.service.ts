import httpClient from '../utils/httpClient';
import {RequestResponse} from '../../types/common';
import {UserDetail, UserSummary} from '../../types/user.type';

const getUsersList = async () => {
  try {
    const response = await httpClient.get<RequestResponse<UserSummary[]>>(
      '/users/list',
    );
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const getUserDetail = async ({id}: {id: number}) => {
  try {
    const response = await httpClient.get<RequestResponse<UserDetail>>(
      `/users/detail/${id}`,
    );
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const updateUser = async (data: FormData) => {
  try {
    const response = await httpClient.put<
      RequestResponse<{id: number; username: string; image: string}>
    >('/users', data);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export {getUsersList, getUserDetail, updateUser};
