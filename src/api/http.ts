import CacheStorage from '../storage/cacheStorage';

export default class Http {
  private baseURL: string;
  private cacheStorage: CacheStorage;

  constructor(baseURL: string, cacheStorageName: string) {
    this.baseURL = baseURL;
    this.cacheStorage = new CacheStorage(baseURL, cacheStorageName);
  }

  public async get<T>(endPoint: string, keyword: string): Promise<T> {
    try {
      const response = await fetch(`${this.baseURL}${endPoint}?q=${keyword}`);
      const cached = await this.cacheStorage.get(`${endPoint}?q=${keyword}`, response);
      return cached.json();
    } catch (error) {
      console.error('error', error);
      throw error;
    }
  }
}
