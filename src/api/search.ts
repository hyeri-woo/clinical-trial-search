import Http from './http';
import { Sick } from '../types';
import SessionStorage from '../storage/sessionStorage';
const BASE_URL = 'http://localhost:4000';

const http = new Http(BASE_URL);

const getKeyword = async (keyword: string) => {
  return await http.get<Sick[]>('/sick', {
    params: {
      q: keyword,
    },
  });
};

export const getSearchResult = async (keyword: string) => {
  const sStorage = new SessionStorage();
  const result = sStorage.get(keyword);
  if (result) {
    console.log('calling session storage');
    return result;
  } else {
    const response = await getKeyword(keyword);
    sStorage.save(keyword, response.slice(0, 10));
    console.log('calling api');
    return response;
  }
};
