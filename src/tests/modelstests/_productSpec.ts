import {Products,product} from '../../models/products';

const prds:Products = new Products();
let item:string;

describe('Checking of products model & connection to database',()=>{
    it('"create" method exists ',()=>{
        expect(prds.create).toBeDefined();
    })
    it('"show" method exists',()=>{
        expect(prds.show).toBeDefined();
    })
    it('"index" method exists ',()=>{
        expect(prds.index).toBeDefined();
    })
    it('"create" method should add a product', async () => {
       
        const result:product[] = await prds.create(
            {
                name:"Apple",
                price: 27
            });
        expect(result[0].name).toEqual("Apple");
        expect(result[0].price).toEqual(27);
        expect(result[0].id).toBeTruthy();
         })
    it('"index" method should return products added', async () => {

        const result:product[] = await prds.index();
        expect(result[0].name).toEqual("Apple");
        expect(result[0].price).toEqual(27);
        expect(result[0].id).toBeTruthy();
        })
    it('"show" method should return specific product', async () => {

        const result:product[] = await prds.show('2');
        expect(result[0].name).toEqual("Apple");
        expect(result[0].price).toEqual(27);
        expect(result[0].id).toBeTruthy();
             })
})
