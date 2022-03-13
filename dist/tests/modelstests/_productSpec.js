"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const products_1 = require("../../models/products");
const prds = new products_1.Products();
let item;
describe('Checking of products model & connection to database', () => {
    it('"create" method exists ', () => {
        expect(prds.create).toBeDefined();
    });
    it('"show" method exists', () => {
        expect(prds.show).toBeDefined();
    });
    it('"index" method exists ', () => {
        expect(prds.index).toBeDefined();
    });
    it('"create" method should add a product', async () => {
        const result = await prds.create({
            name: "Apple",
            price: 27
        });
        expect(result[0].name).toEqual("Apple");
        expect(result[0].price).toEqual(27);
        expect(result[0].id).toBeTruthy();
    });
    it('"index" method should return products added', async () => {
        const result = await prds.index();
        expect(result[0].name).toEqual("Apple");
        expect(result[0].price).toEqual(27);
        expect(result[0].id).toBeTruthy();
    });
    it('"show" method should return specific product', async () => {
        const result = await prds.show('2');
        expect(result[0].name).toEqual("Apple");
        expect(result[0].price).toEqual(27);
        expect(result[0].id).toBeTruthy();
    });
});
