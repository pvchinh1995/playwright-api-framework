export class TokenManager {
    private static accessToken = "";
    private static refreshToken = "";

    static setAccessToken(token: string): void {
        this.accessToken = token;
    }

    static getAccessToken(): string {
        return this.accessToken;
    }

    static setRefreshToken(token: string): void {
        this.refreshToken = token;
    }

    static getRefreshToken(): string {
        return this.refreshToken;
    }

    static clear(): void {
        this.accessToken = "";
        this.refreshToken = "";
    }
}