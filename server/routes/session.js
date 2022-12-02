const express = require("express");
const sessionRouter = express.Router();
const queries = require("../queries");
const pool = require("../db");

sessionRouter.get("/", async (req, res, next) => {
    try {
        let slicedCookieId;
        if (req.cookies['connect.sid']) {
            slicedCookieId = req.cookies['connect.sid'].slice(2, 34);
            console.log(slicedCookieId);
          
        const data = await pool.query(queries.sessionQueries.fetchCookieSession, [slicedCookieId]);
        console.log("Session fetched from session route");
        console.log(data.rows[0].sess);
        res.send(data.rows[0].sess).status(200);
        }
        req.session.cart = {};
    } catch (err) {
        console.log(err.message);
    }
});

module.exports = sessionRouter;
