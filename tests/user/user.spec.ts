import { test, expect } from "../../fixtures/api.fixture";
import { CreateUserRequest } from "../../api/user.api";
import { UpdateUserRequest } from "../../api/user.api";
test.describe("User API", () => {

    test("POST /users/add - should create a user", async ({ userApi }) => {

    const newUser:CreateUserRequest = {
        firstName: "Alex",
        lastName: "Doe",
        age: 30
    };

    const response = await userApi.createUser(newUser);
    const body = await response.json();
    expect(response.status()).toBe(201);
    expect(body.firstName).toEqual("Alex");
});


test("Update user", async ({ userApi }) => {

    const updateUser:UpdateUserRequest = {
        firstName: "Alex",
        age: 30
    };

    const response = await userApi.updateUser(1,updateUser);
    const body = await response.json();
    expect(response.status()).toBe(200);
    expect(body.firstName).toEqual("Alex");
});
});