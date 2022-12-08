const express = require("express");
const sessionRouter = express.Router();
const queries = require("../queries");
const pool = require("../db");

sessionRouter.get("/", async (req, res, next) => {
    try {
        let cookieResponse = {
            cart: {},
            cookie: req.session.cookie
            };
        if (!req.cookies['connect.sid']) {
            console.log(req.session.id);
            // req.session.cart = {};
            res.send(cookieResponse).status(200);
            return
        }
        let slicedCookieId;
        // Check frontend for cookie
        slicedCookieId = req.cookies['connect.sid'].slice(2, 34);
        console.log(slicedCookieId);
        // Query the database
        const data = await pool.query(queries.sessionQueries.fetchCookieSession, [slicedCookieId]);
        console.log("Session fetched from session route");
        console.log(data.rows[0].sess);
        res.send(data.rows[0].sess).status(200);
    } catch (err) {
        console.log(err.message);
    }
});

module.exports = sessionRouter;
