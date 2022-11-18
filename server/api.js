const express = require("express");
const app = express();
const session = require("express-session");
const pgSession = require("connect-pg-simple")(session);
const pg = require("pg");
const cors = require("cors");
const bodyParser = require("body-parser");
// const cookieParser = require("cookie-parser");
const pool = require("./db");
const queries = require("./queries");
// const stripe = require('stripe')(process.env.STRIPE_KEY)

const pgPool = new pg.Pool({
  user: process.env.USER,
  password: process.env.PASSWORD,
  host: process.env.HOST,
  port: process.env.DBPORT,
  database: process.env.DATABASE,
  // Insert pool options here
});

app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// app.use(cookieParser());
//Add middleware for parsing request bodies
app.use(bodyParser.json());
app.use(
  session({
    store: new pgSession({
      pool: pgPool, // Connection pool
      tableName: "session", // Use another table-name than the default "session" one
      // Insert connect-pg-simple options here
    }),
    secret: process.env.FOO_COOKIE_SECRET,
    resave: false,
    cookie: { maxAge: 60 * 60 * 1000 }, // 60 Mins
    saveUninitialized: false,
    // Insert express-session options here
  })
);

app.use((req, res, next) => {
  pool.query(queries.sessionQueries.checkSession)
    .then((sessionExists) => {
      console.log(sessionExists.rows);
      console.log(req)
      if (!sessionExists.rows.length) {
        req.session.isAuth = true;
        const { session } = req;
        // console.log("Session created", session);
        // console.log(sessionExists)
      } else {
        // console.log("Session exists");
      }
      next();
    });
})

app.use(express.static("public"));

// Import and mount the profile router
const profileRouter = require("../server/routes/profile");
app.use("/api/profile", profileRouter);

// Import and mount the products router
const productsRouter = require("../server/routes/products");
app.use("/api/products", productsRouter);

// Import and mount the cart router
const cartRouter = require("../server/routes/cart");
app.use("/api/cart", cartRouter);

// Import and mount the shopping cart router
const shoppingCartRouter = require("../server/routes/shoppingCart");
app.use("/api/shoppingCart", shoppingCartRouter);

// Import and mount the session router
const sessionRouter = require("../server/routes/session");
app.use("/api/session", sessionRouter);

const checkoutRouter = require("../server/routes/checkout");
app.use("/api/checkout", checkoutRouter);


module.exports = app;
