import axios, { AxiosInstance } from 'axios';

export default class http {
  private axiosInstance: AxiosInstance;
  constructor(BASE_URL: string) {
    this.axiosInstance = axios.create({
      baseURL: BASE_URL,
    });
  }

  public async get<T>(endPoint: string, params: object): Promise<T> {
    try {
      const response = await this.axiosInstance.get<T>(endPoint, params);
      return response.data;
    } catch (error) {
      console.error('error', error);
      throw error;
    }
  }
}