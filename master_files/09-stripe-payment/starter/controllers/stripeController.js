const stripe = require('stripe')(process.env.STRIPE_API_KEY);

const stripeController = async (req, res) => {
    const {purchase, total_amount, shipping_fee} = req.body;

    // verify this with the backend, database, products will go into there, usually you'd iterate over the prices by id in the database to verify
    const calculateOrderAmount = () => {
        return total_amount + shipping_fee;
    }

    const paymentIntent = await stripe.paymentIntents.create({
        amount:calculateOrderAmount(),
        currency:'usd'
    })

    console.log(paymentIntent);
    
    
    
    res.json({clientSecret:paymentIntent.client_secret});
}

module.exports = stripeController;