const express = require("express");
const pool = require("../db");
const profileRouter = express.Router();
const bcrypt = require("bcryptjs");
const queries = require("../queries");
const validator = require("validator");

//"POST" a hashed password and username
profileRouter.post(
    "/",

    async (req, res, next) => {
        let { email, password, confirmPassword } = req.body;
        if (!validator.isEmail(email)) {
            console.log("Enter a valid email");
        }
        try {
            const emailExists = await pool.query(queries.usersQueries.checkEmailExists, [email]);
            if (emailExists.rows.length) {
                return res.status(409).send("Duplicate Email");
            }
        } catch (err) {
            console.log(err);
            res.status(500).send("Internal server error!");
        }
        try {
            const hash = await bcrypt.hash(password, 10);
            console.log({
                email,
                password,
                confirmPassword,
                hash,
            });

            const newEmail = await pool.query(queries.usersQueries.insertLogin, [email, hash]);
            res.status(200).json(newEmail);
        } catch (err) {
            console.log(err);
            res.status(500).send("Internal server error!");
        }
    }
);

module.exports = profileRouter;
