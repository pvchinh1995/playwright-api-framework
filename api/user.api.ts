import { BaseApi } from "./base.api";

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

    async getUser(id: number) {
        return this.get(`${this.endpoint}/${id}`);
    }

    async getUsers() {
        return this.get(this.endpoint);
    }

    async searchUser(keyword: string) {

        return await this.get(`${this.endpoint}/search`, {
            params: {
                q: keyword
            }
        });
    }

    async createUser(data: CreateUserRequest) {
    return this.post(`${this.endpoint}/add`, {
        data
    });
    }

    async updateUser(id: number, data: UpdateUserRequest) {
    return this.patch(`${this.endpoint}/${id}`, {
        data
    });
    }

    async deleteUser(id: number) {
    return this.delete(`${this.endpoint}/${id}`, {
    });
    }

}
  

// Tạo sẵn object
// export const userApi = new UserApi();
