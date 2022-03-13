"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Products = void 0;
// ** Import needed module ** \\
const database_1 = __importDefault(require("../database"));
// **Define and export Products model class ** \\
class Products {
    // ** Retrieve all products model ** \\
    async index() {
        try {
            const connector = await database_1.default.connect();
            const sqlQry = 'SELECT * FROM products';
            const result = await connector.query(sqlQry);
            connector.release();
            return result.rows;
        }
        catch (err) {
            throw new Error('Error: Database structure not valid');
        }
    }
    // ** Retrieve specific product model ** \\
    async show(id) {
        try {
            const connector = await database_1.default.connect();
            const sqlQry = 'SELECT * FROM products WHERE id=($1)';
            const result = await connector.query(sqlQry, [id]);
            connector.release();
            return result.rows;
        }
        catch (error) {
            throw new Error('Error: Not valid product id');
        }
    }
    // ** Create new product model ** \\
    async create(c) {
        try {
            const connector = await database_1.default.connect();
            const sqlQry = 'INSERT INTO products(name,price)VALUES($1,$2) RETURNING *';
            const result = await connector.query(sqlQry, [c.name, c.price]);
            connector.release();
            return result.rows;
        }
        catch (err) {
            throw new Error('Error: Entries do not match database structure');
        }
    }
}
exports.Products = Products;
