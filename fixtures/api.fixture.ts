import { test as base } from "@playwright/test";
import { UserApi } from "../api/user.api";
import { AuthApi } from "../api/auth.api";
import { AuthService } from "../auth/auth.service";

type MyFixtures = {
    userApi: UserApi;
    authService: AuthService;
};

export const test = base.extend<MyFixtures>({
    userApi: async ({ request }, use) => {

    await use(new UserApi(request));

},
    authService: async ({ request }, use) => {

        const authApi = new AuthApi(request);

        const authService = new AuthService(authApi);

        await use(authService);

    }

});
export { expect } from "@playwright/test";
