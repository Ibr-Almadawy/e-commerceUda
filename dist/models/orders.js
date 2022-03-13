"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Orders = void 0;
// ** Import needed module ** \\
const database_1 = __importDefault(require("../database"));
// **Define and export Orders module class ** \\
class Orders {
    // ** Retrieve current user's orders model ** \\
    async currentUserOrders(id) {
        try {
            const connector = await database_1.default.connect();
            const sqlQry = 'SELECT * FROM orders WHERE user_id=($1)';
            const result = await connector.query(sqlQry, [id]);
            connector.release();
            return result.rows;
        }
        catch (err) {
            throw new Error('Error: Database structure not valid or Not valid user id');
        }
    }
    // ** Creating new order model ** \\
    async create(c) {
        try {
            const connector = await database_1.default.connect();
            const sqlQry = 'INSERT INTO orders(user_id,product_id,quantity,order_status)VALUES($1,$2,$3,$4) RETURNING *';
            const result = await connector.query(sqlQry, [c.user_id, c.product_id, c.quantity, c.order_status]);
            connector.release();
            return result.rows;
        }
        catch (err) {
            throw new Error('Error: Entries do not match database structurs');
        }
    }
    // ** Adding products to order model ** \\
    async addProductsToOrder(quantity, order_id, product_id) {
        try {
            const connector = await database_1.default.connect();
            const sqlQry = 'INSERT INTO order_products(quantity, order_id, product_id) VALUES($1,$2,$3) RETURNING *';
            const result = await connector.query(sqlQry, [quantity, order_id, product_id]);
            connector.release();
            return result.rows;
        }
        catch (err) {
            throw new Error('Error: No products added ... check values and connection');
        }
    }
}
exports.Orders = Orders;
