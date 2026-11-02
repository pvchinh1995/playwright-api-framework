import { AuthApi } from "../api/auth.api";
import { TokenManager } from "./token-manager";

export class AuthService {

    constructor(
        private authApi: AuthApi
    ) {}

    async login(body: any): Promise<void> {

        const response = await this.authApi.login(body);

        const result = await response.json();

        TokenManager.setAccessToken(result.accessToken);

        TokenManager.setRefreshToken(result.refreshToken);

    }

    logout(): void {
        TokenManager.clear();
    }

}