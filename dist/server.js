"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// ** Import needed modules ** \\
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const products_1 = __importDefault(require("./handlers/products"));
const users_1 = __importDefault(require("./handlers/users"));
const orders_1 = __importDefault(require("./handlers/orders"));
// ** Make instanse of express appliction ** \\
const app = (0, express_1.default)();
// ** Define main variables for port and cors configuration ** \\
const port = 3000;
const corsOptions = {
    origin: 'localhost:3000',
    optionsSuccessStatus: 200
};
// ** Use express and cors middleware in express application ** \\
app.use(express_1.default.urlencoded({ extended: false }));
app.use(express_1.default.json());
app.use((0, cors_1.default)(corsOptions));
// ** Call routes to run for our express application ** \\
(0, products_1.default)(app);
(0, users_1.default)(app);
(0, orders_1.default)(app);
// Setting up server at port 3000 ** \\
app.listen(port, () => {
    console.log(`starting app on:localhost:${port}`);
});
exports.default = app;
