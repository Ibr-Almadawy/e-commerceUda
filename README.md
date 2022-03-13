# Store-front project

## Table of contents

1. Project description :
    - About 
    - How to use  ***Important to run***
2. Project folders and files.
3. Running scripts.
4. Configuring project :
   - Setup Dependencies and Devdependencies.
   - tsconfig.json file configuration.
   - reporter.ts and jasmine.json configration.
5. Database structure.
6. Coding sequence.
7. Testing :
   - Postman testing.
   - Unit-testing with Jasmine:
      * Database models testing.
      * Endpoints testing.
8. References.

### 1. Project description:

 #### About:

   This program designed to provide an online store endpoints API's to let users create account and view products and make orders via 8 endpoints (7 are required), every endpoint designed to achieve its perposes in an effective way and this project provide saving passwords after securing it using cryption tool also provide *jsonwebtoken* to provide more flexability and security.

 #### How to use:

  You can start to use this project in the same way it designed for by follow this steps, but you must jump to know the database structure in section 5 of this file and then come back to feel mors comfortable with the application of this steps :
  + **Before taking first step** I created this project using Postgres databse runs on port **5432** (default setup port) and the server runs on port **3000** on localhost.

  + **First step** Database set up with the postgres user **postgres** by running **psql -U postgres** and Don't forget to change **PG_PASSWORD** variable in **.env** file to fit your *postgres* user password in your machine, start with creating 2 databases in postgres, the "dev" database called *online_store* and the "test" database called *online_store_test*

  + **Second step** Run script "yarn migrate" or "npm run migrate" to create tables in "dev" database (online_store).
  + **Third step** Run server script "yarn start" or "npm run start".

  + **Forth step**: To gain every advantage of this project you must *Create new user* first because this step has the main process of generating ***jwt*** token (No authetication endpoint required) which lets you have an access for the other endpoints and you can create new user by using **"/users"** endoint (POST method) by passing a **user** type to the *body* of this endpoint, example (json structure): 
  {
      "first_name":"Me",
      "last_name": "My grandfather",
      "password":"1234"
  }
  ***This is the json structure for postman testing with adding qoutes to the keys and select (body)-->(row)-->(json), see attached screenshots***
  This action will return a token that has been generating to the *body* then ***this token must be passed to *headers* ***(Postman can help to test).

  + **Fifth step**(***Token required***): By this step you can jump where ever you want, you can:
    1. See all users using **"/user"** endpoint (GET method) with structure of: 
    *id* which generated automatically 
    *first_name*
    *last_name*
    *password* has been crypted using **hashing Salt and pepper**.
    2. See specific user using **"/users/:id"** endpoint (GET method) with the same previous structure.
    3. Create new order using **"/orders"** endpoint (POST method) by passing an **order** type to the *body* of this endpoint, example:
    {
        "product_id":1,
        "quantity":4
    }
    ***Also this is json structure attached to (body)-->(row)-->(json)***
    this will return back the created order with the structure of:
    *id* generated for all created orders automatically.
    *user_id* from the headers token used to access this endpoint. 
    *product_id*
    *quantity*
    *order_status* marks automatically as 'Active' when added an order.
    4. See all current orders placed by the same user by using **"/orders"** endpoint (GET method) with the same previous structure.
    5. Add new product by using **"/products"** endpoint (POST method) by passing a **product** type to the *body* of the endpoint, example:
     {
        "name": "Mango",
        "price": 25
     }
    ***Also this is json structure attached to (body)-->(row)-->(json)***
    this will return back the added product with the structure of:
    *id* generated automatically when adding product.
    *name*
    *price*   

    + **Sixth step**(***Token not required***): Here any one can view or access this endpoints without register or got tokens:
    6. See all products using **"/products"** endpoint (GET method) to view all stored products in database with this structure:
    *id* generated automatically when adding product.
    *name* 
    *price*
    7. See specific product by using **"/products/:id"** endpoint (GET method) to view the product with the **id** provided with the same previous structure.
    8. Of course you can access also **"/users"** endpoint (POST method) in the previous first step to create user without need of token.

    + **Seventh step**: New endpoint created to let the user add products for his/her order using **"/orders/:id/products"** endpoint (POST method) to pass a json object in a simple structure, example:
     {
        "product_id":"2",
        "quantity":50    
     }
    *hint* product_id value passed string and quantity value passed number.
    This will return back the added object in the databasewith this structue:
    *id* generated automatically.
    *quantity* 
    *order_id* passed from request parameter
    *product_id*
### 2. Project folders and files:

    **dist folder** Contains the compiled JavaScript code from TypeScript files.
    **screenshots folder** Contains a screenshots for testing and running with Postman and Jasmine.
    **spec folder** Contains the *jasmine.json* file (jasmine configuration).
    **.env file** Contains the enviroment variables declared for this project.
    **.gitignore** Contains the file names to ignore when using github, in this case this file contains *.env* file to ignore.
    **database.json** Contains the database configuration for the 2 enviroments *dev* and *test* that will be used.
    **package.json** Contains configuration for dependencies and devdependencies modules installed and scripts to run.
    **package-lock.json** 
    **README.md** This file.
    **REQUIRMENTS.md** project requirments.
    **yarn-error.log** 
    **yarn.lock**
    **old_README.md** related to udacity.
    **tsconfig.json** TypeScript configurations file.
    **node_modules folder** All installed packages files.
    **src folder** This is the main folder containing all files for TypeScript code in this main structure:
       1. **handlers folders** Contains 3 handlers for our 3 models *users.ts, products.ts and orders.ts*  and also a middleware file *tokenverify.ts* (More details in section 6:Coding sequence).
       2. **models folders** Contains the 3 main models *products.ts, users.ts and orders.ts*  that connecting the database (As we discuss in section 6:Coding sequence).
       3. **test folder** Which containg 3 folders, 2 of tests *(endpointtests, modelstests)* every folder contains the testing code with jasmine for every model and endpoint, also helper folder contains the *reporter.ts*. 
       4. **database.ts** database coonection setup.
       5. **server.ts** Express sever setup file.
    **migration folder** Contains the migrations to build database tables and drop it(3 up files and 3 down files).

### 3. Running scripts(package.json):

  - **"start"** to start server up.
  - **"watch"** To listen to compile changes.
  - **"test"** To start unit testing and setup migration in the test database. 
  - **"tsc"** To compile TypeScript code.
  - **"nodemon"** To listen to any server changes.
  - **"migrate"** To run migrations to set database structure.

### 4. Configurating project

 #### - Setup Dependencies and Devdependencies:
 + **Dependencies**
    - bcrypt
    - db-migrate
    - db-migrate-pg
    - dotenv
    - express
    - pg
    - supertest
 + **Devdependencies**
    - @types/bcrypt
    - @types/cors
    - @types/express
    - @types/jasmine
    - @types/jsonwebtoken
    - @types/morgan
    - @types/node
    - @types/pg
    - @types/supertest
    - body-parser
    - cors
    - jasmine
    - jasmine-spec-reporter
    - jasmine-ts
    - jsonwebtoken
    - morgan
    - nodemon
    - ts-node
    - tsc-watch
    - typescript

 ####  tsconfig.json file configuration:
   All cofiguration for TypeScript has been modified to fit.

 ####  reporter.ts and jasmine.json configration:
  
   Jasmine reporter configuration file has been configured to load the testing report in the way showing in testing, also jasmine.json setup completed to run tests in the right way.
  
### 5. Database structure: *Running on port 5432*(default setup port)
  
  - Postgres database constructuring starts by using the built-in user **postgres**.
  - Creating two databases:
    1. *online_store* for developing perpose.
    2. *online_store_test* for testing perpose.
  - Configuring the database configuration files to set "dev" and "test" running times (database.json, database.ts).
  - Running "yarn migrate" script will create the structure inside "dev" mode database (online_store) as:

    1. USERS table: 
           columns:
            - id         (SERIAL PRIMARY KEY)
            - first_name (varchar(100))
            - last_name  (varchar(100))
            - password   (varchar(300))
    2. PRODUCTS table:
           columns:
            - id          (SERIAL PRIMARY KEY)
            - name        (VARCHAR(100))
            - price       (INTEGER)
    3. ORDERS table:
           columns:
            - id          (SERIAL PRIMARY KEY)
            - user_id     (INTEGER)
            - product_id  (INTEGER)
            - quantity    (INTEGER)
            - order_status(VARCHAR(15))

### 6. Coding sequence process:
 
 - Starting by setup all needed modules and import it and sitting configuration for:
    + tsconfig.ts
    + database.json
    + reporter.ts
    + jasmine.json
    + .env file
    + .gitignore
    + migrations
 - Creating 2 databases *online_store* for "dev" mode and *online_store_test* for "test" mode. 
 - Creating migrations for 3 tables (3 ups and 3 downs) and test to create tables in "dev" mode database.
 - Create **dbConnector** pool to connect to suitable database based on the mode in **database.ts** file.
 - creating the server setup and listener in **server.ts** file inside *src* folder using *express app* and start make a use of middleware *express.urlencoded,express.json and cors* to the *app*.
 - creating folder for the models contains 3 model files *users.ts, products.ts and orders.ts* :

    - Models:

    **users model** Contains 3 main parts, starts with Distructuring cryption variables which will crypt password using **bcrypt** for hashing passwords salt and pepper and calling its variables from *.env* file and using the **dotenv.config** method to access *.env* variables in this module, after that creating type *user* to use to pass an record to database with the same structure of user table structure, and start to define the class *User* to connect to database tp store and retrieve data by define 3 method inside *Users* class *create, index and show*(as required), create method opens database connection **dbConnector** (imported from database.ts file) to create new user and save in database after crypt password by calling the function **hashSync** in **bcrypt**  and save values and close the database connection using *INSERT* statment using asyncnous function to wait till query succeeded and close connection when confirmed, *index and show* methods will retrieve data by using *SELECT* statment using the same connectind pool **dbConnector** to open and close database connection but no use for **bcrypt** because it is needed in saving data only but *show*returns one record from database based on *id* provided in API.
    The same process has been submitted to products and orders 2.
    
    **products and orders models** files by creating types *product, order* to add and retrieve products and orders using the same **dbConnector** to connect to database and using the same *INSERT* for create method and *SELECT* for *index and show* functions and the same for *show* function will return a record based on *id* provided, all 3 models are exported to use in next step.

    All methods i use *try, catch* to handle any error can arise.

- Creating another folder **handlers** to handle every model
    
    - Handlers:
     **users handler** Created by making instanse class, in **users** handler I created an instanse of class **Users** called **uInstanse** after importing it, and built 3 asyncronous functions *create, index and show*(as required) to use **create** function I pass the values in the *body* to this instance and let the model work to perform its action to save to database the way we explained in user model.

     **products handler** Work the same way, creating instanse of class *products* called **pInstanse** , the same functions submitted to product handler file *create, index and show* to create a product we call *create* function that will work to pass values to **pInstanse** to let the model start to store it, the same way to retriving data calling *index, show* eunctions and handle the model to get the data returned.

     **Orders handlers**Not the same completly but for orders we make **oInstanse** as instanse of class *orders* in the orders model, but here we need to store order for the same active user and show his current orders, for that we need to pass user *id* for the **create** function to save *id* as *user_id* in the order record as table structure and **currentUserOrders** function to view the current active user orders by *SELECT* where the user *id* exists in records, This both functions need to retrieve the user id from the token provided in the headers then we work with *jsonwebtoken* by import it as **jwt** to get the *user_id* back to pass it in our argument.

     **Routes** Finally when handlers ready we create a routes function to be ready to set up endpoint when *app* provided, we have 3 exported  routes functions on the server port **3000** on *localhost*:
     **productsRoute**: Contains 3 routes :
       1. '/products'            *GET* route
       2. '/products/:id'        *GET* route
       3. '/products'            *POST* route    *Middleware applied*
     **usersRoute**: Contains 3 routes:
       1. '/users'               *GET* route     *Middleware applied*
       2. '/users/:id'           *GET* route     *Middleware applied*
       3. '/users'               *POST* route
     **ordersRoute** Contains 2 routes:
       1. '/orders'              *GET* route     *Middleware applied*
       2. '/orders'              *POST* route    *Middleware applied*
       3. '/orders/:id/products' *POST* route 

- Creating a middleware function in an important perpose to pass it to router before start the handler, this function can verify that there is a token associate with the registered user to confirm authorization for some endpoints, Therefore we have a logic that not every unknown user can see all users records in database (index) or see one of them (show) or create an order (create) or see his/her current orders (show) or add product (create) for that we got this middleware to intiate **tokenverify** function inside **tokenverify.ts** file in the *handler* folder that checks if the user hold a token that required to visit this endpoint, also we used *jsonwebtoken* to make this middleware and verify the existence of a valid token by searching in headers for token and store it in **token** and decode it in **decoded** variable, if valid token exists user can access the endpoint and if not error will appeare to user, all this messages handled by using *try, catch*.

- Finally we import all routes files in handlers files to **server.ts** file and pass *app* to each one to start endpoints to work with express server and sitting up server in **server.ts** file to start the server up.

### 7. Testing : All tests based in **src/tests** folder 

 #### Postman testing:
  After code structure has been intiated, I manage every step using postman to ensure that i am in the right route and every modification can be managed well, Postman was a great tool through this project, helped me well and guided me well, in the root of the project you will find **sreenshots** folder that shows 8 screenshots of my steps through every endpoint test steps with *Postman*.

  #### Unit-testing with Jasmine:
   Also using Jasmine helps alot to test this project through 26 tests performed successfully:

 **Database models testing**     *src/tests/modelstests*

  - Checking of products model & connection to database
    √ "create" method exists 
    √ "show" method exists
    √ "index" method exists 
    √ "create" method should add a product
    √ "index" method should return products added
    √ "show" method should return specific product

  - Checking of users model & connection to database
    √ "create" method exists 
    √ "show" method exists
    √ "index" method exists 
    √ "create" method should add a user
    √ "index" method should return users added
    √ "show" method should return specific user

  - Checking of orders model & connection to database
    √ "create" method exists
    √ "currentUserOrders" method exists 
    √ "create" method should add an order
    √ "cuurentUserOrders" method should return user's orde
    √ "addProductsToOrder" method should return products a

   
 **Endpoints testing**         *src/tests/endpointtests*

  - Test orders endpoints responses
    √ "/orders" GET endpoint response success
    √ "/orders" POST endpoint response success 
    √ "/orders/:id/products" POST endpoint response succes

  - Test products endpoints responses
    √ "/products" GET endpoint response success
    √ "/products/:id" GET endpoint response success
    √ "/products" POST endpoint response success

  - Test users endpoints responses
    √ "/users" POST endpoint response success
    √ "/users/:id" GET endpoint response success 
    √ "/users" GET endpoint response success

### 8. References:

1. ***www.w3schools.com***
2. ***developer.mozilla.org***
3. ***nodejs.org*** documentation
4. ***www.npmjs.com*** documentation for *Express ,supertest, Jasmine, Migrations, pg, bcrypt and jsonwebtoken*
5. ***expressjs.com***
6. ***www.postgresql.org*** documentation
6. ***Udacity advanced full-stack web development course***