"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// ** Import needed modules ** \\
const supertest_1 = __importDefault(require("supertest"));
const server_1 = __importDefault(require("../../server"));
const request = (0, supertest_1.default)(server_1.default);
let tkn;
describe('Test orders endpoints responses', () => {
    // ** Testing to index all current user orders using token ** \\
    it('"/orders" GET endpoint response success', async () => {
        const postRes = await request
            .post('/users')
            .send({
            first_name: "Ibrahim",
            last_name: "Almadawy",
            password: "1234"
        });
        tkn = postRes.body; // save generated token
        const response = await request
            .get('/orders')
            .set("content-type", "application/json")
            .set("authorization", `Bearer ${tkn}`);
        expect(response.status).toBe(200);
    });
    // ** Testing to create new order using user token ** \\
    it('"/orders" POST endpoint response success ', async () => {
        const response = await request
            .post('/orders')
            .set("content-type", "application/json")
            .set("authorization", `Bearer ${tkn}`);
        expect(response.status).toBe(200);
    });
    it('"/orders/:id/products" POST endpoint response success ', async () => {
        const response = await request
            .post('/orders/:id/products')
            .set("content-type", "application/json")
            .set("authorization", `Bearer ${tkn}`);
        expect(response.status).toBe(200);
    });
});
