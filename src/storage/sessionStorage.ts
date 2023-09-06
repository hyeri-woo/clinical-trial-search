import { Disease } from '../types';

export default class SessionStorage {
  private EXP = 10; // MIN

  save(keyword: string, diseases: Disease[]) {
    const now = new Date();
    const item = {
      value: diseases,
      expiry: now.getTime() + this.EXP * 60 * 1000,
    };
    sessionStorage.setItem(keyword, JSON.stringify(item));
  }

  get(keyword: string) {
    const item = JSON.parse(sessionStorage.getItem(keyword) || '{}');
    const now = new Date();
    if (Object.keys(item).length === 0) {
      return null;
    }
    if (now.getTime() > item.expiry) {
      this.remove(keyword);
      return null;
    }
    return item.value;
  }

  remove(keyword: string) {
    sessionStorage.removeItem(keyword);
  }
}
