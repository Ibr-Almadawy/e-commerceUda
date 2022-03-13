"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const users_1 = require("../models/users");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
const tokenverify_1 = __importDefault(require("./tokenverify"));
// use donenv to access '.env' variables \\
dotenv_1.default.config();
// ** Create instanse of class 'Users' ** \\
const uInstanse = new users_1.Users();
// *** Show all users stored in database *** \\     **** Token required **** 
const index = async (req, res) => {
    try {
        const usrs = await uInstanse.index();
        return res.json(usrs);
    }
    catch (err) {
        res.send('Error : Database structure not valid for retrieve');
    }
};
// *** Show specific user with specific 'id' *** \\     **** Token required **** 
const show = async (req, res) => {
    try {
        const usrs = await uInstanse.show(req.params.id);
        if (usrs.length !== 0) {
            return res.json(usrs);
        }
        else {
            return res.send('User id not valid');
        }
    }
    catch (err) {
        res.send('Error : Database structure not valid for retrieve');
    }
};
// *** Create a new user handler and generate token for new user *** \\    **** Generating token ****
const create = async (req, res) => {
    try {
        const user = {
            first_name: req.body.first_name,
            last_name: req.body.last_name,
            password: req.body.password
        };
        const usrs = await uInstanse.create(user);
        // ** Sign a jwt for the new user and return a token** \\
        const token = jsonwebtoken_1.default.sign({ user: usrs }, process.env.TOKEN_SECRET);
        res.json(token); // We can return the created user but for testing we return 'token' \\
    }
    catch (err) {
        res.status(400);
        res.send('Error : Data provided not identical to database structure');
    }
};
// *** Set 'users' routes with handlers with token verification as a middleware *** \\
const usersRoute = (app) => {
    app.get('/users', tokenverify_1.default, index);
    app.get('/users/:id', tokenverify_1.default, show);
    app.post('/users', create); // **** Token built here after creating new user **** \\
};
exports.default = usersRoute;
