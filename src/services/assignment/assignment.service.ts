import httpClient from '../utils/httpClient';
import {RequestResponse} from '../../types/common';
import {Assignment} from '../../types/assignment.type';

const getAssignmentsList = async () => {
  try {
    const url = '/assignments/list';
    const response = await httpClient.get<RequestResponse<Assignment[]>>(url);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export {getAssignmentsList};
