"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// **Import needed modules ** \\
const dotenv_1 = __importDefault(require("dotenv"));
const pg_1 = require("pg");
// use donenv to access '.env' variables \\
dotenv_1.default.config();
// ** Distructuring '.env' variables ** \\
const { PG_HOST, PG_DATABASE, PG_DATABASE_TEST, PG_USER, PG_PASSWORD, ENV } = process.env;
let dbConnector = new pg_1.Pool();
// ** Creating connector client to database ** \\
if (ENV === 'test') {
    dbConnector = new pg_1.Pool({
        host: PG_HOST,
        database: PG_DATABASE_TEST,
        user: PG_USER,
        password: PG_PASSWORD
    });
}
if (ENV === 'dev') {
    dbConnector = new pg_1.Pool({
        host: PG_HOST,
        database: PG_DATABASE,
        user: PG_USER,
        password: PG_PASSWORD
    });
}
exports.default = dbConnector;
