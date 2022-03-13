"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const orders_1 = require("../models/orders");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const tokenverify_1 = __importDefault(require("./tokenverify"));
// ** Make instanse of Orders class ** \\
const oInstanse = new orders_1.Orders();
// ** Current user's orders handler** \\       **** Token required *****
const currentUrsOrders = async (req, res) => {
    try {
        // ** Getting back the current 'user_id' stored in token provided ** \\
        const header = req.headers.authorization;
        const token = header.split(' ')[1];
        const decoded = jsonwebtoken_1.default.verify(token, process.env.TOKEN_SECRET);
        const user_id = Object.values(Object.values(decoded)[0][0])[0];
        // ** Handle the model to get orders for active user ** \\
        const ordr = await oInstanse.currentUserOrders(parseInt(user_id));
        return res.json(ordr);
    }
    catch (err) {
        return res.send('Error :No token provided ,Please register first');
    }
};
// ** Create new order handler ** \\    **** Token required ****
const create = async (req, res) => {
    try {
        // ** Getting back the current 'user_id' stored in token provided ** \\
        const header = req.headers.authorization;
        const token = header.split(' ')[1];
        const decoded = jsonwebtoken_1.default.verify(token, process.env.TOKEN_SECRET);
        const user_id = Object.values(Object.values(decoded)[0][0])[0];
        // ** Store 'order' values
        const order = {
            user_id: parseInt(user_id),
            product_id: req.body.product_id,
            quantity: req.body.quantity,
            order_status: "Active" //req.body.order_status (No sense to let user provide the status)
        };
        // ** Handle the order creation and return the stored order back ** \\
        const ordr = await oInstanse.create(order);
        res.json(ordr);
    }
    catch (err) {
        res.send('Error :Not valid order entries');
    }
};
// ** Add products to an order handler ** \\ 
const addProductsToOrder = async (req, res) => {
    try {
        const quantity = req.body.quantity;
        const orderId = parseInt(req.params.id);
        const productId = parseInt(req.body.product_id);
        // ** Handle adding products to order and return the stored order back ** \\
        const ordr = await oInstanse.addProductsToOrder(quantity, orderId, productId);
        res.json(ordr);
    }
    catch (err) {
        res.send('Error: No action performed .. please check values and try again');
    }
};
// *** Set 'orders' routes with handlers with token verification as a middleware *** \\
const ordersRoute = (app) => {
    app.get('/orders', tokenverify_1.default, currentUrsOrders);
    app.post('/orders', tokenverify_1.default, create);
    app.post('/orders/:id/products', tokenverify_1.default, addProductsToOrder);
};
exports.default = ordersRoute;
