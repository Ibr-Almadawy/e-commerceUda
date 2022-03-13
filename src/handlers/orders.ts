// ** Importing needed modules ** \\
import express from 'express';
import { order,Orders } from '../models/orders';
import jwt from 'jsonwebtoken';
import tokenverify from './tokenverify';
 // ** Make instanse of Orders class ** \\
const oInstanse =new Orders();

// ** Current user's orders handler** \\       **** Token required *****
const currentUrsOrders = async (req:express.Request,res:express.Response)=>{
    try{
        // ** Getting back the current 'user_id' stored in token provided ** \\
        const header:string = req.headers.authorization as string;
        const token:string = header.split(' ')[1];
        const decoded:object = jwt.verify(token, process.env.TOKEN_SECRET as string) as object;
        const user_id:string = Object.values(Object.values(decoded)[0][0])[0] as string;
        // ** Handle the model to get orders for active user ** \\
            const ordr = await oInstanse.currentUserOrders(parseInt(user_id));
            return res.json(ordr);
        }catch(err){
            return res.send('Error :No token provided ,Please register first');
         }
    }

// ** Create new order handler ** \\    **** Token required ****
const create = async (req: express.Request, res: express.Response) => {
    try {
     // ** Getting back the current 'user_id' stored in token provided ** \\
    const header:string = req.headers.authorization as string;
    const token:string = header.split(' ')[1];
    const decoded:object = jwt.verify(token, process.env.TOKEN_SECRET as string) as object;
    const user_id:string = Object.values(Object.values(decoded)[0][0])[0] as string;
    // ** Store 'order' values
        const order: order = {
            user_id:parseInt(user_id),
            product_id:req.body.product_id,
            quantity:req.body.quantity,
            order_status:"Active"      //req.body.order_status (No sense to let user provide the status)
        }
        // ** Handle the order creation and return the stored order back ** \\
        const ordr = await oInstanse.create(order);
        res.json(ordr)
    }catch(err) {
        res.send('Error :Not valid order entries');
    }
}
// ** Add products to an order handler ** \\ 
const addProductsToOrder = async (req: express.Request, res: express.Response) => {
     try {
     const quantity: number = req.body.quantity;
     const orderId: number =parseInt(req.params.id); 
     const productId: number = parseInt(req.body.product_id);
     // ** Handle adding products to order and return the stored order back ** \\
     const ordr = await oInstanse.addProductsToOrder(quantity, orderId, productId)
      res.json(ordr)
    }catch(err) {
      res.send('Error: No action performed .. please check values and try again');
    }
  } 

// *** Set 'orders' routes with handlers with token verification as a middleware *** \\
const ordersRoute = (app:express.Application)=>{
    app.get('/orders',tokenverify,currentUrsOrders);
    app.post('/orders',tokenverify,create);
    app.post('/orders/:id/products',tokenverify,addProductsToOrder)
}  

export default ordersRoute;