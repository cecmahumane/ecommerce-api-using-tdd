const express = require("express");
const pool = require("../db");
const productsRouter = express.Router();
const queries = require("../queries");

// GET all product images
productsRouter.get("/", async (req, res, next) => {
    try {
        const data = await pool.query(queries.productQueries.getProductsData);
        return res.send(data.rows);
    } catch (err) {
        console.log(err.message);
        next(err);
    }
});

// GET products that are in cartSess
productsRouter.post("/match", async (req, res, next) => {
    try {
        // console.log(req.body)
        const data = await pool.query(queries.productQueries.matchProductId, [req.body]);
        // console.log(data.rows)
        return res.send(data.rows);
    } catch (err) {
        console.log(err.message);
        next(err);
    }
});

// GET individual product's details
productsRouter.get("/:id", async (req, res, next) => {
    try {
        // console.log(req.params.id)
        const productData = await pool.query(queries.productQueries.productData, [req.params.id]);
        res.send(productData);
        // console.log(productData)
    } catch (err) {
        console.log(err.message);
    }
});

module.exports = productsRouter;
