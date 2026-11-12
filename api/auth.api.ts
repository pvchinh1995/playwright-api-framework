import { BaseApi } from "./base.api";

export class AuthApi extends BaseApi {

    async login(body: any) {
    return this.post("/auth/login", {
        // Request login không bao giờ mang theo token cũ trong TokenManager
        auth: false,
        data: body
    });
    }

}