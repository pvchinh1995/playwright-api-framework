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

export class UserApi extends BaseApi{

    private endpoint = "/users";
    private authEndpoint = "/auth";

    async getUser(id: number, options?: RequestOptions) {
    return this.get(`${this.endpoint}/${id}`, options);
    }

    async getUsers(options?: RequestOptions) {
    return this.get(this.endpoint, options);
    }

    async searchUser(keyword: string, options?: RequestOptions) {
    return this.get(`${this.endpoint}/search`, {
        params: {
            q: keyword
        },
        ...options
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
