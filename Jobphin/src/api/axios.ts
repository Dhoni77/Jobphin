import axios, { AxiosInstance } from 'axios';

export class ApiService {
  private static _instance: ApiService;
  public instance: AxiosInstance;

  private constructor() {
    this.instance = axios.create({
      baseURL: import.meta.env.VITE_API_URL,
    });
  }

  public static get axios(): ApiService {
    // If the instance doesn't exist, create it
    if (!this._instance) {
      this._instance = new ApiService();
    }

    return this._instance;
  }
}
