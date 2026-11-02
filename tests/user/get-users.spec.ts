import { test, expect } from "../../fixtures/api.fixture";

test.describe("User API", () => {

    test("GET /users - should return 200 and a non-empty user list", async ({ userApi }) => {

        const start = Date.now();

        const response = await userApi.getUsers();

        const responseTime = Date.now() - start;

        const body = await response.json();

        // verify status
        expect(response.status()).toBe(200);

        // response time < 3000
        console.log(responseTime);
        expect(responseTime).toBeLessThan(3000);

        // users tồn tại
        expect(body).toHaveProperty("users");

        // users là array
        expect(body.users).toBeInstanceOf(Array);

        // users.length > 0
        expect(body.users.length).toBeGreaterThan(0);

        // User đầu tiên có id = 1
        expect(body.users[0].id).toBe(1);

        // User đầu tiên có firstName = Emily
        expect(body.users[0].firstName).toBe("Emily");

        console.log(`Total users: ${body.users.length}`);
    });


    test("GET /users/{id} - should return 200 when user exists", async ({ userApi }) => {

        const response = await userApi.getUser(1);
        const body = await response.json();
        expect(response.status()).toBe(200);
        expect(body.id).toBe(1);
        expect(body.firstName).toBe("Emily");
    });


    test("GET /users/{id} - should return 404 when user does not exist", async ({ userApi }) => {

        const response = await userApi.getUser(999999);

        expect(response.status()).toBe(404);

    });

    test("PATCH /users/{id} - should return 200 ", async ({ userApi }) => {

        const response = await userApi.updateUser(1,{firstName: "Alex"});
        const body = await response.json();

        expect(response.status()).toBe(200);
        expect(body.firstName).toBe("Alex");
    });

    
    test("DELETE /users/{id} - should return 200 ", async ({ userApi }) => {

        const response = await userApi.deleteUser(1);

        expect(response.status()).toBe(200);
    
    });
    
});