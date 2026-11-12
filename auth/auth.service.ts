import { AuthApi } from "../api/auth.api";
import { TokenManager } from "./token-manager";

export class AuthService {

    constructor(
        private authApi: AuthApi
    ) {}

    async login(body: any): Promise<void> {
    const response = await this.authApi.login(body);
    const result = await response.json();

    // Fail ngay tại bước login nếu không lấy được accessToken,
    // tránh để lỗi trượt xuống các test sau dưới dạng 401 khó hiểu
    if (!response.ok() || !result.accessToken) {
        throw new Error(
            `Login failed with status ${response.status()}: ${result.message ?? "missing accessToken in response"}`
        );
    }

    TokenManager.setAccessToken(result.accessToken);
    TokenManager.setRefreshToken(result.refreshToken ?? "");
    }


    logout(): void {
        TokenManager.clear();
    }

}