// ** Import needed modules ** \\
import express from 'express';
import cors from 'cors';
import productsRoute  from './handlers/products';
import usersRoute from './handlers/users';
import ordersRoute from './handlers/orders';

// ** Make instanse of express appliction ** \\
const app: express.Application = express();
// ** Define main variables for port and cors configuration ** \\
const port:number =3000;
const corsOptions = {
    origin : 'localhost:3000',
    optionsSuccessStatus: 200 
  };

// ** Use express and cors middleware in express application ** \\
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors(corsOptions));

// ** Call routes to run for our express application ** \\
productsRoute(app);
usersRoute(app);
ordersRoute(app);



// Setting up server at port 3000 ** \\
app.listen(port,  ()=>{
    console.log(`starting app on:localhost:${port}`)
})

export default app;

