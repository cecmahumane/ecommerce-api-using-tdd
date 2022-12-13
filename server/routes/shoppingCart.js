const express = require("express");
// const pool = require("../db");
const shoppingCartRouter = express.Router();
// const queries = require("../queries");

// Increment shopping cart item
shoppingCartRouter.put("/plus", async (req, res, next) => {
    const { size, id} = req.body
    try {
        console.log('++++++')
        req.session.cart[id][size].quantity++; 
        console.log('++++++')
        return res.status(200).send(req.session);
    } catch (error) {
        console.log(error)
    }
});

// Decrement shopping cart item
shoppingCartRouter.put("/minus", async (req, res, next) => {
    const { size, id} = req.body
    try {
        console.log('-----')
        req.session.cart[id][size].quantity--; 
        console.log('-----')
        return res.status(200).send(req.session);
    } catch (error) {
        console.log(error)
    }
});

// Remove shopping cart item
shoppingCartRouter.put("/remove", async (req, res, next) => {
    const { size, id} = req.body
    try {
        console.log('remove')
        if (!req.session.cart[id][size]) {
            delete req.session.cart[id]; 
        }
        delete req.session.cart[id][size];
        console.log('remove')
        return res.status(200).send(req.session);
    } catch (error) {
        console.log(error)
    }
});

shoppingCartRouter.put("/emptyCart", async (req, res) => {
    try {
        if (req.session.cart) {
            delete req.session.cart;
            req.session.cart = {};
            return res.status(200).send(req.session);
        }
    } catch (error) {
        
    }
});

module.exports = shoppingCartRouter;
