import { test, expect } from "../../fixtures/api.fixture";
import { TokenManager } from "../../auth/token-manager";

// Các test trong file này kiểm tra đúng các trường hợp của option `auth`
// trong BaseApi.buildRequestOptions() khi gọi API cần xác thực /auth/me.
// TokenManager đã có token nhờ fixture loginOnce (login 1 lần cho mỗi worker).

test("GET /auth/me - should return 200 when using TokenManager token (auth: true)", async ({ userApi }) => {

    // auth: true -> ép dùng token trong TokenManager, bỏ qua mọi header thủ công
    const response = await userApi.getCurrentUser({
        auth: true,
        headers: {
            Accept: "application/json",
        },
    });

    const body = await response.json();

    expect(response.status()).toBe(200);
    expect(body.id).toBeDefined();
    // Token được login bằng user "emilys" nên /auth/me phải trả về đúng user đó
    expect(body.username).toBe("emilys");
});

test("GET /auth/me - should return 200 when using a manual token", async ({ userApi }) => {

    // Không ghi auth + có Authorization thủ công -> dùng token thủ công.
    // Ở đây lấy tạm chính token trong TokenManager để làm token thủ công hợp lệ,
    // mục đích là kiểm tra nhánh "ưu tiên token thủ công" của BaseApi.
    const response = await userApi.getCurrentUser({
        headers: {
            Accept: "application/json",
            Authorization: `Bearer ${TokenManager.getAccessToken()}`,
        },
    });

    const body = await response.json();

    expect(response.status()).toBe(200);
    expect(body.id).toBeDefined();
    expect(body.username).toBeDefined();
});

test("GET /auth/me - should return 401 when auth is false", async ({ userApi }) => {

    // auth: false -> không gửi Authorization, kể cả khi TokenManager đang có token.
    // Đây là cách viết đúng cho case "thiếu token" sau khi đã có login 1 lần:
    // nếu để trống auth, BaseApi sẽ tự gắn token của TokenManager và test nhận 200.
    const response = await userApi.getCurrentUser({
        auth: false,
        headers: {
            Accept: "application/json",
        },
    });

    const body = await response.json();

    expect(response.status()).toBe(401);
    expect(body.message).toBeDefined();
});

test("GET /auth/me - should return 401 when token is invalid", async ({ userApi }) => {

    // Không ghi auth + Authorization thủ công sai -> token thủ công được ưu tiên
    // hơn token đúng trong TokenManager, nên server vẫn trả 401.
    // Đây cũng là cách các API cần dùng token khác sẽ truyền token riêng của nó.
    const response = await userApi.getCurrentUser({
        headers: {
            Accept: "application/json",
            Authorization: "Bearer invalid_token_123456",
        },
    });

    const body = await response.json();

    expect(response.status()).toBe(401);
    expect(body.message).toBeDefined();
});
