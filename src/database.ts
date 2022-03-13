// **Import needed modules ** \\
import dotenv from 'dotenv'
import { Pool} from 'pg'

// use donenv to access '.env' variables \\
dotenv.config();

// ** Distructuring '.env' variables ** \\
const {
PG_HOST,
PG_DATABASE,
PG_DATABASE_TEST,
PG_USER,
PG_PASSWORD,
ENV
} = process.env ;
let dbConnector:Pool =new Pool();

// ** Creating connector client to database ** \\
if(ENV ==='test'){
    dbConnector = new Pool({
        host : PG_HOST,
        database : PG_DATABASE_TEST,
        user : PG_USER,
        password : PG_PASSWORD
    })
}
if(ENV ==='dev'){
    dbConnector = new Pool({
            host : PG_HOST,
            database : PG_DATABASE,
            user : PG_USER,
            password : PG_PASSWORD
        })
}

export default dbConnector ;