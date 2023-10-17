import { HttpAdapter } from '../interfaces/http-adapter.interface';

export class FetchAdapter implements HttpAdapter {
  async get<T>(url: string): Promise<T> {
    try {
      return await fetch(url).then((res) => res.json());
    } catch (error) {
      throw new Error('This is an error - Check logs');
    }
  }
}
