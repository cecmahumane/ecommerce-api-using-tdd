const express = require("express");
const sessionRouter = express.Router();
const queries = require("../queries");
const pool = require("../db");

sessionRouter.get("/", async (req, res, next) => {
    try {
        let slicedCookieId;
        if (req.cookies['connect.sid']) {
            slicedCookieId = req.cookies['connect.sid'].slice(2);
            console.log(slicedCookieId);
          }
        const data = await pool.query(queries.sessionQueries.fetchCookieSession, [slicedCookieId]);
        console.log("Session fetched from session route");
        res.send(data).status(200);
    } catch (err) {
        console.log(err.message);
    }
});

module.exports = sessionRouter;
