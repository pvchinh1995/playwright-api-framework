import { BaseApi } from "./base.api";

export class AuthApi extends BaseApi {

    async login(body: any) {
        return this.post("/auth/login", {
            data: body
        });
    }

}