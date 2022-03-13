// **Import needed modules ** \\
import express from "express";
import jwt from'jsonwebtoken';
import dotenv from 'dotenv';

// use donenv to access '.env' variables \\
dotenv.config();

// ** jwt verification method (middleware) to require token for specific endpoints ** \\
const tokenverify = (req: express.Request, res: express.Response, next:express.NextFunction) => {
    try {
        // Get token \\
        const hdrToken:string = req.headers.authorization as string;
        const token:string = hdrToken.split(' ')[1];
        // Verify the token \\
        const decoded:object = jwt.verify(token, process.env.TOKEN_SECRET as string) as object;
        next()
    } catch (error) {
        res.status(401).send('Not authorized ... Please create new user first'); 
    }
}

export default tokenverify ;