import Http from './http';
import { Sick } from '../types';

const PROD_API_URL = 'https://rowan-wind-mimosa.glitch.me';
// const DEV_API_URL = 'http://localhost:4000'
const CACHE_STORAGE_NAME = 'clinical-trial';

const http = new Http(PROD_API_URL, CACHE_STORAGE_NAME);

export const getSearchResult = async (keyword: string) => {
  return await http.get<Sick[]>('/sick', keyword);
};
