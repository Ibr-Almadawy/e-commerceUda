"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const products_1 = require("../models/products");
const tokenverify_1 = __importDefault(require("./tokenverify"));
const dotenv_1 = __importDefault(require("dotenv"));
// use donenv to access '.env' variables \\
dotenv_1.default.config();
// ** Create instanse of class 'Products' ** \\
const pInstanse = new products_1.Products();
// *** Show all products handler stored in database *** \\
const index = async (req, res) => {
    try {
        const prdct = await pInstanse.index();
        return res.json(prdct);
    }
    catch (err) {
        res.send('Error : Database structure not valid for retrieve');
    }
};
// *** Show specific product handler with specific 'id' *** \\
const show = async (req, res) => {
    try {
        const prdct = await pInstanse.show(req.params.id);
        if (prdct.length !== 0) {
            return res.json(prdct);
        }
        else {
            return res.send('Product id not valid');
        }
    }
    catch (err) {
        res.send('Error : Database structure not valid for retrieve');
    }
};
// *** Create a new product handler *** \\\    **** Token required **** 
const create = async (req, res) => {
    try {
        const product = {
            name: req.body.name,
            price: req.body.price
        };
        const prdct = await pInstanse.create(product);
        res.json(prdct);
    }
    catch (err) {
        res.send('Data provided not identical to database structure');
    }
};
// *** Set 'products' routes with handlers with token verification as a middleware on 'create'*** \\
const productsRoute = (app) => {
    app.get('/products', index);
    app.get('/products/:id', show);
    app.post('/products', tokenverify_1.default, create);
};
exports.default = productsRoute;
