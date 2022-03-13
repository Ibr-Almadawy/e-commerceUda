import tokenverify from "../../handlers/tokenverify";
import supertest from "supertest";
import app from "../../server";

const request = supertest(app);

describe('Test products endpoints responses', () => {
 // ** Testing to index all products in database ** \\
    it('"/products" GET endpoint response success', async () => {
        const response = await request.get('/products');
        expect(response.status).toBe(200); 
    })
 // ** Testing to show specific product using product id ** \\
    it('"/products/:id" GET endpoint response success', async () => {
        const response = await request.get('/products/:id');
        expect(response.status).toBe(200);
        
    })
 // ** Testing creating new product ** \\
    it('"/products" POST endpoint response success', async () => {
        // ** Creating user to get token ** \\
        const postRes = await request.post('/users')
        .set("Content-type","application/json")
        .send({
            first_name:"Ibrahim",
            last_name:"Almadawy",
            password :"1234"
        })
        const tkn = postRes.body; // save generated token 
        const response = await request
        .post('/products')
        .set("content-type","application/json")
        .set("authorization",`Bearer ${tkn}`)
        expect(response.status).toBe(200);  
    })
});
