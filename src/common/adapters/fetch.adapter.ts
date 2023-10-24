import { HttpAdapter } from '../interfaces/http-adapter.interface';

export class FetchAdapter implements HttpAdapter {
  async get<T>(url: string): Promise<T> {
    try {
      const response = await fetch(url);
      const data = await response.json();
      return data;
    } catch (error) {
      console.log(error);
      throw new Error('This is an error - Check logs');
    }
  }
}
