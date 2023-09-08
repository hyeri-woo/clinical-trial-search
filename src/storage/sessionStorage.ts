export default class SessionStorage {
  private EXPIRE_TIME = 10 * 60 * 1000; // 10MIN

  save(key: string, value: any) {
    const now = new Date();
    const item = {
      value: value,
      expiry: now.getTime() + this.EXPIRE_TIME,
    };
    sessionStorage.setItem(key, JSON.stringify(item));
  }

  get(key: string) {
    const item = JSON.parse(sessionStorage.getItem(key) || '{}');
    const now = new Date();
    if (Object.keys(item).length === 0) {
      return null;
    }
    if (now.getTime() > item.expiry) {
      this.remove(key);
      return null;
    }
    return item.value;
  }

  remove(key: string) {
    sessionStorage.removeItem(key);
  }
}
