import { BaseApi } from "./base.api";
import { RequestOptions } from "../types/request-options";

export interface CreateUserRequest {
    firstName: string;
    lastName: string;
    age?: number;
}

export interface UpdateUserRequest {
    firstName: string;
    age?: number;
}

export interface GetUsersParams {
    limit?: number;
    skip?: number;
    select?: string;
    sortBy?: string;
    order?: "asc" | "desc";
}


export class UserApi extends BaseApi{

    private endpoint = "/users";
    private authEndpoint = "/auth";

    async getUser(id: number, options?: RequestOptions) {
    return this.get(`${this.endpoint}/${id}`, options);
    }

    async getUsers(query?: GetUsersParams, options?: RequestOptions) {
    // Bỏ qua các param có giá trị undefined, nếu không Playwright sẽ
    // serialize thành chuỗi "undefined" và gửi lên URL thật
    const params: Record<string, any> = {
        ...(options?.params ?? {})
    };

    for (const [key, value] of Object.entries(query ?? {})) {
        if (value !== undefined) {
            params[key] = value;
        }
    }

    return this.get(this.endpoint, {
        ...options,
        params
    });
    }

    async searchUser(keyword: string, options?: RequestOptions) {
    return this.get(`${this.endpoint}/search`, {
        ...options,
        // Merge params thay vì để ...options ghi đè mất param q
        params: {
            ...(options?.params ?? {}),
            q: keyword
        }
    });
    }

    async filterUsers(key: string, value: string, options?: RequestOptions) {
    return this.get(`${this.endpoint}/filter`, {
        ...options,
        params: {
            ...(options?.params ?? {}),
            key,
            value
        }
    });
    }


    async createUser(data: CreateUserRequest, options?: RequestOptions) {
    return this.post(`${this.endpoint}/add`, {
        data,
        ...options
    });
    }

    async updateUser(id: number, data: UpdateUserRequest, options?: RequestOptions) {
    return this.patch(`${this.endpoint}/${id}`, {
        data,
        ...options
    });
    }

    async deleteUser(id: number, options?: RequestOptions) {
    return this.delete(`${this.endpoint}/${id}`, options);
    }

    async getCurrentUser(options?: RequestOptions) {
        return this.get(`${this.authEndpoint}/me`, options);
    }

}
  

// Tạo sẵn object
// export const userApi = new UserApi();
