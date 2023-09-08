import Http from './http';
import { Sick } from '../types';

const BASE_URL =
  process.env.NODE_ENV === 'production' ? process.env.REACT_APP_PROD_API_URL : process.env.REACT_APP_DEV_API_URL;
const CACHE_STORAGE_NAME = 'clinical-trial';

const http = new Http(BASE_URL || '', CACHE_STORAGE_NAME);

export const getSearchResult = async (keyword: string) => {
  return await http.get<Sick[]>('/sick', keyword);
};
