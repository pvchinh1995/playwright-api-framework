import { test, expect } from "../../fixtures/api.fixture";

// Bài Query Parameters và Path Parameters trên DummyJSON /users.
// Các endpoint trong file này đều là API public nên mọi request đều truyền
// { auth: false } để nói rõ "không cần token" (đây là auth ở tầng request,
// khác với loginOnce ở tầng fixture vẫn chạy khi dùng userApi).

test.describe("Query & Path Parameters - User API", () => {

    test("Path param - different ids return different users", async ({ userApi }) => {

        const response1 = await userApi.getUser(1, { auth: false });
        const body1 = await response1.json();

        const response2 = await userApi.getUser(2, { auth: false });
        const body2 = await response2.json();

        // Path param /users/1 và /users/2 trỏ tới 2 resource khác nhau
        expect(response1.status()).toBe(200);
        expect(body1.id).toBe(1);
        expect(body1.firstName).toBe("Emily");

        expect(response2.status()).toBe(200);
        expect(body2.id).toBe(2);
        expect(body2.firstName).toBe("Michael");
    });

    test("Query params - limit & skip paginate the user list", async ({ userApi }) => {

        const page1Response = await userApi.getUsers({ limit: 5, skip: 0 }, { auth: false });
        const page1 = await page1Response.json();

        expect(page1Response.status()).toBe(200);
        expect(page1.users.length).toBe(5);
        expect(page1.limit).toBe(5);
        expect(page1.skip).toBe(0);
        expect(page1.total).toBeGreaterThan(5);

        const page2Response = await userApi.getUsers({ limit: 5, skip: 5 }, { auth: false });
        const page2 = await page2Response.json();

        expect(page2Response.status()).toBe(200);
        expect(page2.users.length).toBe(5);
        expect(page2.skip).toBe(5);
        // Trang 2 bắt đầu ngay sau phần tử cuối của trang 1, không trùng lặp
        expect(page2.users[0].id).toBe(page1.users[4].id + 1);
    });

    test("Query param - select returns only the requested fields", async ({ userApi }) => {

        const response = await userApi.getUsers({ limit: 2, select: "firstName,age" }, { auth: false });
        const body = await response.json();

        expect(response.status()).toBe(200);
        // id luôn được trả về, cộng đúng 2 field đã select
        expect(body.users[0].firstName).toBeDefined();
        expect(body.users[0].age).toBeDefined();
        // Field không select thì không có trong response
        expect(body.users[0].email).toBeUndefined();
        expect(body.users[0].lastName).toBeUndefined();
    });

    test("Query param - search returns users matching the keyword", async ({ userApi }) => {

        const response = await userApi.searchUser("Emily", { auth: false });
        const body = await response.json();

        expect(response.status()).toBe(200);
        expect(body.total).toBeGreaterThan(0);
        expect(body.users.some((user: any) => user.firstName === "Emily")).toBeTruthy();
    });

    test("Query params - filter returns only users matching key & value", async ({ userApi }) => {

        const response = await userApi.filterUsers("gender", "female", { auth: false });
        const body = await response.json();

        expect(response.status()).toBe(200);
        expect(body.users.length).toBeGreaterThan(0);
        // Mọi user trả về đều thỏa điều kiện lọc
        expect(body.users.every((user: any) => user.gender === "female")).toBeTruthy();
    });

    test("Query params - sortBy & order sort the user list", async ({ userApi }) => {

        const response = await userApi.getUsers({ limit: 5, sortBy: "firstName", order: "asc" }, { auth: false });
        const body = await response.json();

        expect(response.status()).toBe(200);

        const firstNames = body.users.map((user: any) => user.firstName);
        const sorted = [...firstNames].sort((a: string, b: string) => a.localeCompare(b));

        expect(firstNames).toEqual(sorted);
    });

});
