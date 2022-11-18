const express = require("express");
const checkoutRouter = express.Router();
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY)

// Increment shopping cart item
checkoutRouter.post("/", async (req, res, next) => {
    // console.log(req)
    const items = req.body;
    //#########################
    // console.log(items)
    //#########################
    let lineItems = [];
    items.forEach((item) => {
        lineItems.push(
            {
                price_data: {
                    product_data: {
                      name: item.productName,
                      description: item.size,
                      images: [`PUBLIC_URL${item.image}`]
                    }, 
                    unit_amount_decimal: item.price,
                    currency: 'cad'
                },
                quantity: item.quantity
            }
        )
    })

    const session = await stripe.checkout.sessions.create({
        line_items: lineItems,
        mode: 'payment',
        success_url: "http://localhost:3000/success",
        cancel_url: "http://localhost:3000/cancel"
    })
    // console.log(session);
    res.send({
        url: session.url
    });
});


module.exports = checkoutRouter;
