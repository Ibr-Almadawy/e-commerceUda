import express from 'express';
import { product,Products } from '../models/products';
import tokenVerify from './tokenverify';
import dotenv from'dotenv';

// use donenv to access '.env' variables \\
dotenv.config();

// ** Create instanse of class 'Products' ** \\
const pInstanse =new Products();

// *** Show all products handler stored in database *** \\
const index = async (req:express.Request,res:express.Response)=>{
    try{
        const prdct = await pInstanse.index();
            return res.json(prdct);
    }catch(err){
        res.send('Error : Database structure not valid for retrieve');
    }
    
}
// *** Show specific product handler with specific 'id' *** \\
const show = async (req:express.Request,res:express.Response)=>{
    try{
        const prdct:product[] = await pInstanse.show(req.params.id);
        if(prdct.length!==0){
            return res.json(prdct);
        }else{
            return res.send('Product id not valid');
        }
    }catch(err){
        res.send('Error : Database structure not valid for retrieve');
    }
    
}
// *** Create a new product handler *** \\\    **** Token required **** 
const create = async (req: express.Request, res: express.Response) => {
    try{       
    const product: product = {
            name: req.body.name,
            price: req.body.price
        } 
        const prdct = await pInstanse.create(product);
        res.json(prdct)
    }catch(err){
        res.send('Data provided not identical to database structure');
    }
}

// *** Set 'products' routes with handlers with token verification as a middleware on 'create'*** \\
const productsRoute = (app:express.Application)=>{
    app.get('/products',index);
    app.get('/products/:id',show);
    app.post('/products',tokenVerify,create);
    
}  

export default productsRoute;