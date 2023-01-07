// const { queries } = require("@testing-library/react");
const express = require("express");
const pool = require("../db");
const queries = require("../queries");
const checkoutRouter = express.Router();
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

// Instantiate Stripe checkout 
checkoutRouter.post("/", async (req, res, next) => {
    // console.log(req)
    const items = req.body;
    //#########################
    // console.log(items)
    //#########################
    let lineItems = [];
    items.forEach((item) => {
        let nonDecimalPrice = item.price * 100;
        lineItems.push(
            {
                price_data: {
                    product_data: {
                        name: item.productName,
                        description: item.size,
                        images: [`PUBLIC_URL${item.image}`]
                    },
                    unit_amount: nonDecimalPrice,
                    currency: 'cad'
                },
                quantity: item.quantity
            }
        )
    })

    const session = await stripe.checkout.sessions.create({
        line_items: lineItems,
        mode: 'payment',
        success_url: "http://localhost:3000/success?session_id={CHECKOUT_SESSION_ID}",
        cancel_url: "http://localhost:3000/cancel"
    })
    // console.log(session);
    res.send({
        url: session.url
    });
});

// Send customer details to frontend on success
checkoutRouter.get("/success", async (req, res, next) => {
    // console.log(req.query)
    const session = await stripe.checkout.sessions.retrieve(req.query.session_id);
    // console.log(session);
    // const customer = await stripe.customers.retrieve(session.customer);
    res.send(session.customer_details);
});

// Write order details to order table
checkoutRouter.post("/checkoutOrder", async (req, res, next) => {
    // console.log(req.body)
    let { userId, orderContent } = req.body;
    const writeOrder = await pool.query(queries.orderQueries.insertOrder, [userId, orderContent])
    res.send(writeOrder);
});



module.exports = checkoutRouter
