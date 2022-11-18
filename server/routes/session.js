const express = require("express");
const sessionRouter = express.Router();
const queries = require("../queries");
const pool = require("../db");

// GET individual product's details
sessionRouter.get("/", async (req, res, next) => {
    try {
        const data = await pool.query(queries.sessionQueries.checkSession);
        console.log("Session fetched from session route");
        res.send(data).status(200);
    } catch (err) {
        console.log(err.message);
    }
});

module.exports = sessionRouter;
