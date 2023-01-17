const express = require("express");
const pool = require("../db");
const profileRouter = express.Router();
const bcrypt = require("bcryptjs");
const queries = require("../queries");
const validator = require("validator");

//"POST" a hashed password and username
profileRouter.post("/", async (req, res, next) => {
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

profileRouter.post("/checkoutProfile", async (req, res, next) => {
    let { email, password } = req.body;
    let slicedCookieId;
    let userExists;

    try {
        // Check frontend for cookie
        slicedCookieId = req.cookies['connect.sid'].slice(2, 34);
        console.log(slicedCookieId);
    } catch (error) {
        console.log(error);
    }

    try {
        const emailExists = await pool.query(queries.usersQueries.checkEmailExists, [email]);
        if (emailExists.rows.length) {
            userExists = true;
            return res.status(409).send("Duplicate Email");
        }
        userExists = false;
    } catch (err) {
        console.log(err);
        res.status(500).send("Internal server error!");
    }

    // Commented out for testing of session fetching from database 

    if (!userExists) {
        try {
            const hash = await bcrypt.hash(password, 10);
            console.log({
                email,
                password,
                hash,
                slicedCookieId
            });

            const newCheckoutUser = await pool.query(queries.usersQueries.insertUserAfterOrder, [email, hash, slicedCookieId]);
            res.status(200).json(newCheckoutUser);
        } catch (error) {
            console.log(error);
        }
    }
}
);

profileRouter.get("/userId", async (req, res, next) => {
    let sid = req.cookies['connect.sid'].slice(2, 34);
    try {
        const getUserdId = await pool.query(queries.usersQueries.getUserId, [sid]);
        // console.log(getUserdId);
        res.send(getUserdId);
    } catch (error) {
        console.log(error)
    }
}
);

profileRouter.get("/verifyUser", async (req, res, next) => {
    // console.log(req.body)
    let userEmail = req.query.email;
    // console.log(userEmail);
    let submittedPassword = req.query.password;
    console.log(submittedPassword)
    let retrievedPasswordhash;
    try {
        const getUserPasswordhash = await pool.query(queries.usersQueries.checkPassword, [userEmail]);
        // console.log(getUserPasswordhash);
        retrievedPasswordhash = getUserPasswordhash.rows[0].passwordhash;
        // res.send(retrievedPasswordhash.rows[0].passwordhash);
        console.log(retrievedPasswordhash);
    } catch (error) {
        console.log(error)
    }
    try {
        if (await bcrypt.compare(submittedPassword, retrievedPasswordhash)) {
            console.log("successful user verification");
            return res.send(true)
        };
        res.send(false);
    } catch (error) {
        console.log(error);
    }
}
);


module.exports = profileRouter;
