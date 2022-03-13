// ** Import needed modules ** \\
import dbConnector from "../database";
import bcrypt from 'bcrypt';
import dotenv from 'dotenv';

// use donenv to access '.env' variables \\
dotenv.config();
// ** Get bcrypt needed variables from .env file ** \\
const {
     BCRYPT_PASSWORD,
     SALT_ROUNDS 
}=process.env;
const pepper = BCRYPT_PASSWORD;
const saltRounds = SALT_ROUNDS as string;

// ** Declare type 'user'
export type user = {
    id?:number;
    first_name:string;
    last_name:string;
    password:string;
}
// ** Define and export Users model class ** \\
export class Users{
     // ** Creating new user model ** \\
     async create(c:user):Promise<user[]>{
        try{
            const connector = await dbConnector.connect();
            const sqlQry = 'INSERT INTO users(first_name,last_name,password)VALUES($1,$2,$3) RETURNING *';
            // ** Start hashing the password provided ** \\
            const hash = bcrypt.hashSync(
                c.password + pepper, 
                parseInt(saltRounds)
             );
            const result =await connector.query(sqlQry,[c.first_name,c.last_name,hash]);
            connector.release();
            return result.rows ;
        }catch(err){
            throw new Error('Error: Not valid values ,Values must match database structure');
        }
    } 
    // ** Retrieve all users ** \\
    async index():Promise<user[]>{
        try{
            const connector = await dbConnector.connect();
            const sqlQry = 'SELECT * FROM users';
            const result =await connector.query(sqlQry);
            connector.release();
            return result.rows;
        }catch(err){
            throw new Error('Error: Database structure do not match query');
        }
    }
    // ** Showing specific product ** \\
    async show(id:string):Promise<user[]>{
        try{
            const connector = await dbConnector.connect();
            const sqlQry = 'SELECT * FROM users WHERE id=($1)';
            const result =await connector.query(sqlQry,[id]);
            connector.release();
            return result.rows;
        }catch(err){
            throw new Error('Error :Not valid user id ...');
        }
    }
   
}

