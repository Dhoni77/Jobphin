import axios, { AxiosInstance } from 'axios';
import { JOB_BASE_URL } from '.';

export class ApiService {
  private static _instance: ApiService;
  public instance: AxiosInstance;

  private constructor() {
    this.instance = axios.create({
      baseURL: JOB_BASE_URL,
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
