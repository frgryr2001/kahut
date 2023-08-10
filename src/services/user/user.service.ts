import httpClient from '../utils/httpClient';
import {RequestResponse} from '../../types/common';
import {UserSummary} from '../../types/user.type';

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

export {getUsersList};
