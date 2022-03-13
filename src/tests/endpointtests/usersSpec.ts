import supertest from "supertest";
import app from "../../server";


let tkn:string;
const request = supertest(app);

describe('Test users endpoints responses', () => {
 // ** Testing creating user ** \\
    it('"/users" POST endpoint response success', async () => {
        const response = await request.post('/users')
        .set("Content-type","application/json")
        .send({
            first_name:"Ibrahim",
            last_name:"Almadawy",
            password :"1234"
        })
        expect(response.status).toBe(200);
        tkn = response.body;  // Saving generated token
    })
    it('"/users/:id" GET endpoint response success ', async () => {
 // ** Testing to show specific user using user id ** \\
        const response = await request
        .get('/users/:id')
        .set("content-type","application/json")
        .set("authorization",`Bearer ${tkn}`)
        expect(response.status).toBe(200);
    })
 // ** Testing to index all users in database ** \\
    it('"/users" GET endpoint response success', async () => {
        const response = await request
        .get('/users')
        .set("content-type","application/json")
        .set("authorization",`Bearer ${tkn}`)
        expect(response.status).toBe(200);
        
    })
});


