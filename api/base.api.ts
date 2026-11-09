import { APIRequestContext } from "@playwright/test";
import { TokenManager } from "../auth/token-manager";
import { RequestOptions } from "../types/request-options";
import config from "../config/env";

export class BaseApi {
  constructor(protected request: APIRequestContext) {}

  private buildRequestOptions(options?: RequestOptions) {
    const { auth, ...requestOptions } = options ?? {};

    const headers = {
        ...(requestOptions.headers ?? {}),
    };

    // Tìm Authorization Header, không phân biệt chữ hoa/thường
    const authorizationKeys = Object.keys(headers).filter(
        key => key.toLowerCase() === "authorization"
    );

    if (auth === false) {
        // Không sử dụng Authorization Header
        authorizationKeys.forEach(key => delete headers[key]);

    } else if (auth === true) {
        // Bắt buộc sử dụng token từ TokenManager
        authorizationKeys.forEach(key => delete headers[key]);

        const token = TokenManager.getAccessToken();

        if (token) {
            headers.Authorization = `Bearer ${token}`;
        }

    } else {
        // Mặc định: ưu tiên Authorization Header thủ công
        if (authorizationKeys.length === 0) {
            const token = TokenManager.getAccessToken();

            if (token) {
                headers.Authorization = `Bearer ${token}`;
            }
        }
    }

    return {
        ...requestOptions,
        headers
    };
}

 async get(url: string, options?: RequestOptions) {
    return this.request.get(
      `${config.baseUrl}${url}`,
      this.buildRequestOptions(options)
    );
  }

  async post(url: string, options?: RequestOptions) {
    return this.request.post(
      `${config.baseUrl}${url}`,
      this.buildRequestOptions(options)
    );
  }

  async put(url: string, options?: RequestOptions) {
    return this.request.put(
      `${config.baseUrl}${url}`,
      this.buildRequestOptions(options)
    );
  }

  async patch(url: string, options?: RequestOptions) {
    return this.request.patch(
      `${config.baseUrl}${url}`,
      this.buildRequestOptions(options)
    );
  }

  async delete(url: string, options?: RequestOptions) {
    return this.request.delete(
      `${config.baseUrl}${url}`,
      this.buildRequestOptions(options)
    );
  }
}
