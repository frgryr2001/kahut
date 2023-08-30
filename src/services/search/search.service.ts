import {SearchResponse} from '../../types/search.type';
import httpClient from '../utils/httpClient';

export async function search(searchTerm: string) {
  const res = await httpClient.get<SearchResponse>(`/search?k=${searchTerm}`);
  return res;
}
