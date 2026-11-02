import { APIRequestContext } from "@playwright/test";
import { TokenManager } from "../auth/token-manager";
import { RequestOptions } from "../types/request-options";
import config from "../config/env";

export class BaseApi {
  constructor(protected request: APIRequestContext) {}

  async get(url: string, options?: RequestOptions) {
    const headers = {
      ...(options?.headers ?? {}),
    };

    const token = TokenManager.getAccessToken();

    if (token) {
      headers.Authorization = `Bearer ${token}`;
    }

    return this.request.get(`${config.baseUrl}${url}`, {
      ...options,
      headers,
    });
  }

  async post(url: string, options?: RequestOptions) {
    const headers = {
      ...(options?.headers ?? {}),
    };

    const token = TokenManager.getAccessToken();

    if (token) {
      headers.Authorization = `Bearer ${token}`;
    }

    return this.request.post(`${config.baseUrl}${url}`, {
      ...options,
      headers,
    });
  }

  async put(url: string, options?: RequestOptions) {
    const headers = {
      ...(options?.headers ?? {}),
    };

    const token = TokenManager.getAccessToken();

    if (token) {
      headers.Authorization = `Bearer ${token}`;
    }

    return this.request.put(`${config.baseUrl}${url}`, {
      ...options,
      headers,
    });
  }

  async delete(url: string, options?: RequestOptions) {
    const headers = {
      ...(options?.headers ?? {}),
    };

    const token = TokenManager.getAccessToken();

    if (token) {
      headers.Authorization = `Bearer ${token}`;
    }

    return this.request.delete(`${config.baseUrl}${url}`, {
      ...options,
      headers,
    });
  }

  async patch(url: string, options?: RequestOptions) {

    const headers = {
      ...(options?.headers ?? {}),
    };

    const token = TokenManager.getAccessToken();

    if (token) {
      headers.Authorization = `Bearer ${token}`;
    }

    return this.request.patch(`${config.baseUrl}${url}`, {
      ...options,
      headers,
    });
  }
}
