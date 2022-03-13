"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
// use donenv to access '.env' variables \\
dotenv_1.default.config();
// ** jwt verification method (middleware) to require token for specific endpoints ** \\
const tokenverify = (req, res, next) => {
    try {
        // Get token \\
        const hdrToken = req.headers.authorization;
        const token = hdrToken.split(' ')[1];
        // Verify the token \\
        const decoded = jsonwebtoken_1.default.verify(token, process.env.TOKEN_SECRET);
        next();
    }
    catch (error) {
        res.status(401).send('Not authorized ... Please create new user first');
    }
};
exports.default = tokenverify;
