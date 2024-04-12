const express = require('express');
const app = express();
const stripe = require('stripe')('your_stripe_secret_key');

app.set('view engine', 'ejs');

app.get('/', (req, res) => {
    // Display product listing
    res.render('index');
});

app.post('/purchase', (req, res) => {
    // Process Stripe payment
    const token = req.body.stripeToken; // Using body-parser to parse request bodies
    const chargeAmount = 1000; // $10.00 in cents

    stripe.charges.create({
        amount: chargeAmount,
        currency: 'usd',
        source: token,
        description: 'Example charge'
    }, (err, charge) => {
        if (err) {
            res.status(500).send("Error in payment");
        } else {
            res.send("Success");
        }
    });
});

app.listen(3000, () => console.log('Server started on port 3000'));
