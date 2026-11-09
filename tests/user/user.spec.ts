import { test, expect } from "../../fixtures/api.fixture";
import { CreateUserRequest } from "../../api/user.api";
import { UpdateUserRequest } from "../../api/user.api";

const token = process.env.API_TOKEN;

const validAuthHeaders = {
    Accept: "application/json",
    Authorization: `Bearer ${token}`,
};

const invalidAuthHeaders = {
    Accept: "application/json",
    Authorization: "Bearer invalid_token_123456",
};

// test.describe("User API", () => {

//     test("POST /users/add - should create a user", async ({ userApi }) => {

//     const newUser:CreateUserRequest = {
//         firstName: "Alex",
//         lastName: "Doe",
//         age: 30
//     };

//     const response = await userApi.createUser(newUser);
//     const body = await response.json();
//     expect(response.status()).toBe(201);
//     expect(body.firstName).toEqual("Alex");
// });


// test("Update user", async ({ userApi }) => {

//     const updateUser:UpdateUserRequest = {
//         firstName: "Alex",
//         age: 30
//     };

//     const response = await userApi.updateUser(1,updateUser);
//     const body = await response.json();
//     expect(response.status()).toBe(200);
//     expect(body.firstName).toEqual("Alex");
//     expect(body).toBeEmpty();

// });
// });

test("GET /auth/me - should return 200 when token is valid", async ({ userApi }) => {

    expect(token).toBeTruthy();

    const response = await userApi.getCurrentUser({
        headers: validAuthHeaders,
    });

    const body = await response.json();

    expect(response.status()).toBe(200);
    expect(body.id).toBeDefined();
    expect(body.username).toBeDefined();

});


test("GET /auth/me - should return 401 when token is missing", async ({ userApi }) => {

    const response = await userApi.getCurrentUser({
        headers: {
            Accept: "application/json",
        },
    });

    const body = await response.json();

    expect(response.status()).toBe(401);
    expect(body.message).toBeDefined();

});


test("GET /auth/me - should return 401 when token is invalid", async ({ userApi }) => {

    const response = await userApi.getCurrentUser({
        headers: invalidAuthHeaders,
    });

    const body = await response.json();

    expect(response.status()).toBe(401);
    expect(body.message).toBeDefined();

});