import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';
import qs from 'qs';

enum Methods {
  Get = 'get',
  Put = 'put',
  Post = 'post',
  Patch = 'patch',
  Delete = 'delete',
}

let api: AxiosInstance;

const caller = async (
  method: Methods,
  address: string,
  params: AxiosRequestConfig | FormData | Record<string, unknown> = {},
  config: AxiosRequestConfig = {},
): Promise<{ data: unknown }> => {
  const response = await api[method](address, params, config);
  return response;
}

export const GET = async (
  address: string,
  params: Record<string, unknown> = {},
  config: AxiosRequestConfig = {},
): Promise<unknown> => {
  const response = await caller(Methods.Get, address, {
    params,
    paramsSerializer: qs.stringify,
    ...config,
  });
  return response.data;
}

export const PUT = async (address: string, params: Record<string, unknown> = {}): Promise<unknown> => {
  const response = await caller(Methods.Put, address, params);
  return response.data;
}

export const POST = async (
  address: string,
  params: FormData | Record<string, unknown> = {},
  config: AxiosRequestConfig = {},
): Promise<unknown> => {
  const response = await caller(Methods.Post, address, params, config);
  return response.data;
}

export const PATCH = async (address: string, params: Record<string, unknown> = {}): Promise<unknown> => {
  const response = await caller(Methods.Patch, address, params);
  return response.data;
}

export const DELETE = async (address: string, params: Record<string, unknown> = {}): Promise<unknown> => {
  const response = await caller(Methods.Delete, address, params);
  return response.data;
}

export const setToken = (token: string): void => {
  api.defaults.headers.common.Authorization = `Bearer ${token}`;
}

export const initializeApi = (apiUrl: string): void => {
  api = axios.create({
    baseURL: apiUrl,
    timeout: 30000,
    headers: {
      'Content-Type': 'application/json',
    },
    withCredentials: true,
  });
};

export default (): AxiosInstance => api;
