
// ** Import needed module ** \\
import dbConnector from '../database'

// ** Declare type 'product'
export type product = {
    id?:number;
    name:string;
    price:number;
}

// **Define and export Products model class ** \\
export class Products{
    // ** Retrieve all products model ** \\
    async index():Promise<product[]>{
        try{
            const connector = await dbConnector.connect();
            const sqlQry = 'SELECT * FROM products';
            const result =await connector.query(sqlQry);
            connector.release();
            return result.rows;
        }catch(err){
            throw new Error('Error: Database structure not valid');
        }
    }
    // ** Retrieve specific product model ** \\
    async show(id:string):Promise<product[]>{
        try{
            const connector = await dbConnector.connect();
            const sqlQry = 'SELECT * FROM products WHERE id=($1)';
            const result =await connector.query(sqlQry,[id]);
            connector.release();
            return result.rows ;
        }catch(error){
            throw new Error('Error: Not valid product id');
        }
    } 
    // ** Create new product model ** \\
    async create(c:product):Promise<product[]>{
        try{
            const connector = await dbConnector.connect();
            const sqlQry = 'INSERT INTO products(name,price)VALUES($1,$2) RETURNING *';
            const result =await connector.query(sqlQry,[c.name,c.price]);
            connector.release();
            return result.rows ;
        }catch(err){
            throw new Error('Error: Entries do not match database structure');
        }
    } 
}

