import { test, expect } from '@playwright/test';
import { userSchema } from "../../schemas/user.schema";
import { validateSchema } from "../../utils/schema-validator";

test('Get user detail successfully', async ({ request }) => {
    const start = Date.now();
    const response = await request.get('https://dummyjson.com/users/1');
    const responseTime = Date.now() - start;
    const body = await response.json();

    //verify status
    expect(response.status()).toBe(200);

    //response time < 2000
    console.log(responseTime);
    expect(responseTime).toBeLessThan(2000);

    //schema
    expect(validateSchema(userSchema,body)).toBeTruthy();

    //id = 1
    expect(body.id).toBe(1);

    //firstName = Emily
    expect(body.firstName).toBe('Emily');

    //lastName = Johnson
    expect(body.lastName).toBe('Johnson');

    //email đúng format
    expect(body.email).toMatch(
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/);

    //phone != null
    expect(body.phone).toBeTruthy();

    //age > 0
    expect(body.age).toBeGreaterThan(0);

    //gender chỉ được Male hoặc Female
    expect(['male', 'female']).toContain(body.gender);

    //image bắt đầu bằng https://
    expect(body.image).toMatch(/^https:\/\//);

    //address tồn tại
    expect(body.address).toBeTruthy();

    //company tồn tại
    expect(body.company).toBeTruthy();

    //bank tồn tại
    expect(body.bank).toBeTruthy();
});