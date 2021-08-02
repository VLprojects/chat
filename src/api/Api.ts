import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';
import qs from 'qs';

enum Methods {
  Get = 'get',
  Put = 'put',
  Post = 'post',
  Patch = 'patch',
  Delete = 'delete',
}

class Api {
  private api: AxiosInstance;

  constructor() {
    this.api = axios.create({
      // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
      baseURL: `${process.env.REACT_APP_API_BASEURL}`,
      timeout: 30000,
      headers: {
        'Content-Type': 'application/json',
      },
      withCredentials: true,
    });
  }

  private async caller(
    method: Methods,
    address: string,
    params: AxiosRequestConfig | FormData | Record<string, unknown> = {},
    config: AxiosRequestConfig = {},
  ): Promise<{ data: unknown }> {
    return this.api[method](address, params, config).catch((e) => {
      throw e;
    });
  }

  public async get(
    address: string,
    params: Record<string, unknown> = {},
    config: AxiosRequestConfig = {},
  ): Promise<unknown> {
    const response = await this.caller(Methods.Get, address, {
      params,
      paramsSerializer: qs.stringify,
      ...config,
    });
    return response.data;
  }

  public async put(address: string, params: Record<string, unknown> = {}): Promise<unknown> {
    const response = await this.caller(Methods.Put, address, params);
    return response.data;
  }

  public async post(
    address: string,
    params: FormData | Record<string, unknown> = {},
    config: AxiosRequestConfig = {},
  ): Promise<unknown> {
    const response = await this.caller(Methods.Post, address, params, config);
    return response.data;
  }

  public async patch(address: string, params: Record<string, unknown> = {}): Promise<unknown> {
    const response = await this.caller(Methods.Patch, address, params);
    return response.data;
  }

  public async delete(address: string, params: Record<string, unknown> = {}): Promise<unknown> {
    const response = await this.caller(Methods.Delete, address, params);
    return response.data;
  }

  public setToken(token: string): void {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    this.api.defaults.headers.common.Authorization = `Bearer ${token}`;
  }
}

export default new Api();
