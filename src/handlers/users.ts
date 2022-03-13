import express from 'express';
import { user,Users } from '../models/users';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import tokenVerify from './tokenverify';

// use donenv to access '.env' variables \\
dotenv.config();

// ** Create instanse of class 'Users' ** \\
const uInstanse =new Users();

// *** Show all users stored in database *** \\     **** Token required **** 
const index = async (req:express.Request,res:express.Response)=>{
    try{
         const usrs = await uInstanse.index();
        return res.json(usrs);
    }catch(err){
        res.send('Error : Database structure not valid for retrieve');
    }
   
}
// *** Show specific user with specific 'id' *** \\     **** Token required **** 
const show = async (req:express.Request,res:express.Response)=>{
    try{
        const usrs = await uInstanse.show(req.params.id);
        if(usrs.length!==0){
            return res.json(usrs);
        }else{
            return res.send('User id not valid')
        }
        
    }catch(err){
        res.send('Error : Database structure not valid for retrieve');
    }
}
// *** Create a new user handler and generate token for new user *** \\    **** Generating token ****
const create = async (req: express.Request, res: express.Response) => {
    try {
        const user: user = {
            first_name: req.body.first_name,
            last_name:req.body.last_name,
            password: req.body.password
        }
        const usrs = await uInstanse.create(user);
        // ** Sign a jwt for the new user and return a token** \\
        const token:string = jwt.sign({ user: usrs }, process.env.TOKEN_SECRET as string );
        res.json(token)   // We can return the created user but for testing we return 'token' \\
    } catch(err) {
        res.status(400);
        res.send('Error : Data provided not identical to database structure');
    }
}
// *** Set 'users' routes with handlers with token verification as a middleware *** \\
const usersRoute = (app:express.Application):void=>{
    app.get('/users',tokenVerify,index);
    app.get('/users/:id',tokenVerify,show); 
    app.post('/users',create);   // **** Token built here after creating new user **** \\
}  

export default usersRoute;