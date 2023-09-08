export default class CacheStorage {
  private EXPIRE_TIME = 10 * 60 * 1000; // 10 MIN
  private cacheStorageName: string;
  private baseURL: string | undefined;

  constructor(cacheStorageName: string, baseURL: string | undefined) {
    this.cacheStorageName = cacheStorageName;
    this.baseURL = baseURL;
  }

  public save(endPoint: string, response: Response) {
    caches.open(this.cacheStorageName).then((cache) => {
      cache.put(this.baseURL + endPoint, response.clone());
    });
  }

  public async get(endPoint: string, response: Response): Promise<any> {
    try {
      const cache = await caches.open(this.cacheStorageName);
      const cachedResponse = await cache.match(this.baseURL + endPoint);
      if (!cachedResponse) {
        await this.save(endPoint, response);
        console.log('calling from api');
        // eslint-disable-next-line react-hooks/exhaustive-deps
        return response.clone();
      }
      const date = new Date(cachedResponse.headers.get('Date') || Date.now());
      if (Date.now() > date.getTime() + this.EXPIRE_TIME) {
        await this.save(endPoint, response);
        console.log('calling from api');
        // eslint-disable-next-line react-hooks/exhaustive-deps
        return response.clone();
      }
      console.log('calling from cache');
      // eslint-disable-next-line react-hooks/exhaustive-deps
      return cachedResponse;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  public async delete(currentCache: string) {
    const keys = await caches.keys();
    for (const key of keys) {
      const isOurCache = key.startsWith('myapp-');
      if (currentCache === key || !isOurCache) {
        continue;
      }
      caches.delete(key);
    }
  }
}
