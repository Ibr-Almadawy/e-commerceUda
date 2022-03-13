import {Orders,order} from '../../models/orders';

const ords:Orders = new Orders();


describe('Checking of orders model & connection to database',()=>{
    it('"create" method exists',()=>{
        expect(ords.create).toBeDefined();
    })
    it('"currentUserOrders" method exists ',()=>{
        expect(ords.currentUserOrders).toBeDefined();
    })
    it('"create" method should add an order', async () => {
       
        const result:order[] = await ords.create(
            {
                user_id:1,
                product_id: 1,
                quantity:5
            });
        expect(result[0].user_id).toEqual(1);
        expect(result[0].product_id).toEqual(1);
        expect(result[0].quantity).toEqual(5);
         })
    it('"cuurentUserOrders" method should return user\'s orders', async () => {

        const result:order[] = await ords.currentUserOrders(1);
        expect(result[0].user_id).toEqual(1);
        expect(result[0].product_id).toEqual(1);
        expect(result[0].quantity).toEqual(5);
        })
    it('"addProductsToOrder" method should return products added with quantities', async () => {

        const result:object[] = await ords.addProductsToOrder(2,2,2);
        expect(result[0]).toEqual(
            {
                "id": 1,
                "quantity": 2,
                "order_id": 2,
                "product_id": 2
            }
        );
            })
})
