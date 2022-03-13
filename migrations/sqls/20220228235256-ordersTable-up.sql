CREATE TABLE orders(
    id SERIAL PRIMARY KEY, 
    user_id INTEGER NOT NULL,
    product_id INTEGER NOT NULL,
    quantity INTEGER NOT NULL,
    order_status VARCHAR(15)
);
