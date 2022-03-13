"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Users = void 0;
// ** Import needed modules ** \\
const database_1 = __importDefault(require("../database"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const dotenv_1 = __importDefault(require("dotenv"));
// use donenv to access '.env' variables \\
dotenv_1.default.config();
// ** Get bcrypt needed variables from .env file ** \\
const { BCRYPT_PASSWORD, SALT_ROUNDS } = process.env;
const pepper = BCRYPT_PASSWORD;
const saltRounds = SALT_ROUNDS;
// ** Define and export Users model class ** \\
class Users {
    // ** Creating new user model ** \\
    async create(c) {
        try {
            const connector = await database_1.default.connect();
            const sqlQry = 'INSERT INTO users(first_name,last_name,password)VALUES($1,$2,$3) RETURNING *';
            // ** Start hashing the password provided ** \\
            const hash = bcrypt_1.default.hashSync(c.password + pepper, parseInt(saltRounds));
            const result = await connector.query(sqlQry, [c.first_name, c.last_name, hash]);
            connector.release();
            return result.rows;
        }
        catch (err) {
            throw new Error('Error: Not valid values ,Values must match database structure');
        }
    }
    // ** Retrieve all users ** \\
    async index() {
        try {
            const connector = await database_1.default.connect();
            const sqlQry = 'SELECT * FROM users';
            const result = await connector.query(sqlQry);
            connector.release();
            return result.rows;
        }
        catch (err) {
            throw new Error('Error: Database structure do not match query');
        }
    }
    // ** Showing specific product ** \\
    async show(id) {
        try {
            const connector = await database_1.default.connect();
            const sqlQry = 'SELECT * FROM users WHERE id=($1)';
            const result = await connector.query(sqlQry, [id]);
            connector.release();
            return result.rows;
        }
        catch (err) {
            throw new Error('Error :Not valid user id ...');
        }
    }
}
exports.Users = Users;
