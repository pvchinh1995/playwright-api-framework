import { test as base, request as playwrightRequest } from "@playwright/test";
import { UserApi } from "../api/user.api";
import { AuthApi } from "../api/auth.api";
import { AuthService } from "../auth/auth.service";
import { TokenManager } from "../auth/token-manager";
import config from "../config/env";

type TestFixtures = {
    userApi: UserApi;
    authService: AuthService;
};

type WorkerFixtures = {
    // Fixture chỉ để chạy setup 1 lần cho mỗi worker, không trả về dữ liệu cho test
    loginOnce: void;
};

export const test = base.extend<TestFixtures, WorkerFixtures>({
    userApi: async ({ request, loginOnce }, use) => {
        // Chỉ cần test xin userApi là loginOnce (worker) đã chạy xong trước đó.
        // loginOnce không có giá trị sử dụng, việc destructure ở đây là để
        // khai báo phụ thuộc: test nào dùng userApi thì mới kích hoạt login.
        void loginOnce;

        await use(new UserApi(request));
    },

    authService: async ({ request }, use) => {
        const authApi = new AuthApi(request);
        const authService = new AuthService(authApi);
        await use(authService);
    },

    // scope: "worker" -> đoạn setup này chỉ chạy 1 lần cho mỗi worker process,
    // các test tiếp theo trong cùng worker dùng lại token trong TokenManager,
    // không login lại. Mỗi worker là 1 process riêng nên sẽ login 1 lần riêng.
    loginOnce: [
        async ({}, use) => {
            // Worker fixture KHÔNG được dùng fixture "request" có sẵn
            // (vì "request" là test-scoped), nên phải tự tạo APIRequestContext riêng.
            const apiContext = await playwrightRequest.newContext();

            const authService = new AuthService(new AuthApi(apiContext));

            console.log("[auth] Login once per worker...");

            await authService.login({
                username: config.testUser.username,
                password: config.testUser.password
            });

            // Mọi thứ sau use() là teardown, chạy khi worker kết thúc
            await use();

            TokenManager.clear();

            await apiContext.dispose();
        },
        { scope: "worker" }
    ]
});

export { expect } from "@playwright/test";
