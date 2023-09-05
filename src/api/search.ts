import Http from './http';
import { Disease } from '../types';
const BASE_URL = 'http://localhost:4000';

const http = new Http(BASE_URL);

export const getKeyword = async (keyword: string) => {
  return await http.get<Disease[]>('/sick', {
    params: {
      q: keyword,
    },
  });
};
