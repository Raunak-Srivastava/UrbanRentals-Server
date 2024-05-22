const express = require("express");
const router = express.Router();
const Booking = require("../models/bookingModel");
const Car = require("../models/carModel");
const { v4: uuidv4 } = require("uuid");
const stripe = require("stripe")(
  "sk_test_51PItSESCIcgAOX1ECeOkJ2wztVXYBaaNhDzAMfR4gxoiDr18ZOKVq8Hl1PrEWOxaVoxCjJ9gxxAErzsQCI391Fqv00ytHQVuH2"
);
router.post("/bookcar", async (req, res) => {
  const { token } = req.body;
  try {
    const customer = await stripe.customers.create({
      email: token.email,
      source: token.id,
    });

    const payment = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [{
          price_data: {
              currency: 'inr',
              product_data: {
                  name: 'Car Booking',
              },
              unit_amount: req.body.totalAmount * 100, // Amount in the smallest currency unit (e.g., paise for INR)
          },
          quantity: 1,
      }],
      customer: customer.id,
      mode: 'payment',
      success_url: 'http://localhost:3000/success', // Redirect URL after successful payment
      // cancel_url: 'http://localhost:3000/cancel', // Redirect URL after failed payment
  }, {
      idempotencyKey: uuidv4(),
  });

    if (payment) {
      req.body.transactionId = payment.id;
      const newbooking = new Booking(req.body);
      await newbooking.save();
      const car = await Car.findOne({ _id: req.body.car });
      car.bookedTimeSlots.push(req.body.bookedTimeSlots);

      await car.save();
      res.send("Your booking is successfull");
    } else {
      return res.status(400).json(error);
    }
  } catch (error) {
    console.log(error);
    return res.status(400).json(error);
  }
});


router.get("/getallbookings", async(req, res) => {

    try {

        const bookings = await Booking.find().populate('car')
        res.send(bookings)
        
    } catch (error) {
        return res.status(400).json(error);
    }
  
});


module.exports = router;