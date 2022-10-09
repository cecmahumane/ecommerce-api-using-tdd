// const express = require('express');
// const pool = require('../db');
// const sessionRouter = express.Router();
// const queries = require('../queries');

// // "GET" the session id from the database
// sessionRouter.get('/', async (req, res, next) => {
//     try {
//     const sessionExists = await pool.query(queries.checkSession);
//     if (!sessionExists.rows.length) {
//         req.session.isAuth = true;
//         res.send(sessionExists.rows[1])
//         console.log("Session created");
//         // console.log(sessionExists)
//     }
//     console.log("Session exists")
// } catch (err) {
//     console.log(err.message)
// }
// })