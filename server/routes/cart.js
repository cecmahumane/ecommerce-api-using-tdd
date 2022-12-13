const express = require('express');
const pool = require('../db');
const cartRouter = express.Router();
const queries = require('../queries');

// Add Item(s) to cart
cartRouter.post('/', async (req, res, next) => {
    let cartProductNumber = 0;
    const { size, quantity, productName } = req.body;
    try {
        const getProductNumber = await pool.query(queries.productQueries.productData, [productName]);
        cartProductNumber = getProductNumber.rows[0].id;
        console.log(cartProductNumber)
    } catch (error) {
        console.log(error)
    }

    let cartProduct = {
        [cartProductNumber]: {
            [size]: {
                quantity: quantity
            }
        }
    };
    
    try {
        if (req.session.cart === undefined) {
            req.session.cart = cartProduct;
            // const addCartItem = await pool.query(queries.sessionQueries.addSessionCartItem, [req.session]);
            console.log("post")
            // console.log(addCartItem);
            return res.status(201).send(req.session);
        };
    } catch (err) {
        console.log(err.message);
    }
})

cartRouter.put('/addNewItem', async (req, res, next) => {

    let cartProductNumber = 0;
    const { size, quantity, productName } = req.body.productData;
    // const { cartInfo } = req.body.sessCart.data;
    // console.log([cartInfo]);
    try {
        const getProductNumber = await pool.query(queries.productQueries.productData, [productName]);
        cartProductNumber = getProductNumber.rows[0].id;
        // console.log(cartProductNumber)
    } catch (error) {
        console.log(error)
    }
    console.log(req.session);
    try {
        req.session.cart[cartProductNumber] = {
            [size]: {
                quantity: quantity
            }
        };
        return res.status(201).send(req.session);
    } catch (error) {
        console.log(error)
    }
})

cartRouter.put('/addNewSize', async (req, res, next) => {
    
    let cartProductNumber = 0;
    const { size, quantity, productName } = req.body.productData;
    // const { cartInfo } = req.body.sessCart.data;
    // console.log([cartInfo]);
    try {
        const getProductNumber = await pool.query(queries.productQueries.productData, [productName]);
        cartProductNumber = getProductNumber.rows[0].id;
        // console.log(cartProductNumber)
    } catch (error) {
        console.log(error)
    }

    try {
        req.session.cart[cartProductNumber][size] = {
            quantity: quantity
        };
        return res.status(201).send(req.session);
    } catch (error) {
        console.log(error)
    }
})

cartRouter.put('/addOneToSize', async (req, res, next) => {
    let cartProductNumber = 0;
    const { size, quantity, productName } = req.body.productData;
    // const { cartInfo } = req.body.sessCart.data;
    // console.log([cartInfo]);
    try {
        const getProductNumber = await pool.query(queries.productQueries.productData, [productName]);
        cartProductNumber = getProductNumber.rows[0].id;
        // console.log(cartProductNumber)
    } catch (error) {
        console.log(error)
    }

    try {
        console.log('******')
        // console.log(req.session.cart[cartProductNumber][size].quantity)
        req.session.cart[cartProductNumber][size].quantity++; 
        console.log('******')
        return res.status(201).send(req.session);
    } catch (error) {
        console.log(error)
    }
});



module.exports = cartRouter;