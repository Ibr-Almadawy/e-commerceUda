"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const supertest_1 = __importDefault(require("supertest"));
const server_1 = __importDefault(require("../../server"));
let tkn;
const request = (0, supertest_1.default)(server_1.default);
describe('Test users endpoints responses', () => {
    // ** Testing creating user ** \\
    it('"/users" POST endpoint response success', async () => {
        const response = await request.post('/users')
            .set("Content-type", "application/json")
            .send({
            first_name: "Ibrahim",
            last_name: "Almadawy",
            password: "1234"
        });
        expect(response.status).toBe(200);
        tkn = response.body; // Saving generated token
    });
    it('"/users/:id" GET endpoint response success ', async () => {
        // ** Testing to show specific user using user id ** \\
        const response = await request
            .get('/users/:id')
            .set("content-type", "application/json")
            .set("authorization", `Bearer ${tkn}`);
        expect(response.status).toBe(200);
    });
    // ** Testing to index all users in database ** \\
    it('"/users" GET endpoint response success', async () => {
        const response = await request
            .get('/users')
            .set("content-type", "application/json")
            .set("authorization", `Bearer ${tkn}`);
        expect(response.status).toBe(200);
    });
});
