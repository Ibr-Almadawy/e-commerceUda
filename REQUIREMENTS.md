# API Requirements
The company stakeholders want to create an online storefront to showcase their great product ideas. Users need to be able to browse an index of all products, see the specifics of a single product, and add products to an order that they can view in a cart page. You have been tasked with building the API that will support this application, and your coworker is building the frontend.

These are the notes from a meeting with the frontend developer that describe what endpoints the API needs to supply, as well as data shapes the frontend and backend have agreed meet the requirements of the application. 

## API Endpoints
 
  ***Server runs on port 3000***

  **productsRoute**: Contains 3 routes :
       1. '/products'                *GET* route
       2. '/products/:id'            *GET* route
       3. '/products'                *POST* route    *Middleware applied*
  **usersRoute**: Contains 3 routes:
       1. '/users'                   *GET* route     *Middleware applied*
       2. '/users/:id'               *GET* route     *Middleware applied*
       3. '/users'                   *POST* route
  **ordersRoute** Contains 2 routes:
       1. '/orders'                  *GET* route     *Middleware applied*
       2. '/orders'                  *POST* route    *Middleware applied*
       3. '/orders/:id/products'     *POST* route

#### Products
- Index 
- Show
- Create [token required]
- [OPTIONAL] Top 5 most popular products 
- [OPTIONAL] Products by category (args: product category)

#### Users
- Index [token required]
- Show [token required]
- Create N[token required]


#### Orders
- Current Order by user (args: user id)[token required]
- [OPTIONAL] Completed Orders by user (args: user id)[token required]


## Data Shapes

####  Database structure:
     
  ***Postgres database runs on port '5432'***

  - Postgres database runs on default port **5432** and constructuring starts by using the built-in user **postgres**.
  - Creating two databases:
    1. *online_store* for developing perpose.
    2. *online_store_test* for testing perpose.
  - Configuring the database configuration files to set "dev" and "test" running times (database.json, database.ts).
  - Running "yarn migrate" script will create the structure inside "dev" mode database (online_store) as:

    1. users table: 
           columns:
            - id         (SERIAL PRIMARY KEY)
            - first_name (VARCHAR(100))
            - last_name  (VARCHAR(100))
            - password   (VARCHAR(300))
    2. products table:
           columns:
            - id          (SERIAL PRIMARY KEY)
            - name        (VARCHAR(100))
            - price       (INTEGER)
    3. orders table:
           columns:
            - id          (SERIAL PRIMARY KEY)
            - user_id     (integer)
            - product_id  (integer)
            - quantity    (integer)
            - order_status(VARCHAR(15))
    4. order_products table:  ***One to many relation**
           columns:
            - id          (SERIAL PRIMARY KEY)
            - quantity    (integer)
            - order_id    (integer) REFERENCES orders(id)    <--||FOREIGN KEY||
            - product_id  (integer) REFERENCES products(id)  <--||FOREIGN KEY||

            
#### Product
-  id
- name
- price
- [OPTIONAL] category

#### User
- id
- firstName
- lastName
- password

#### Orders
- id
- id of each product in the order
- quantity of each product in the order
- user_id
- status of order (active or complete)

