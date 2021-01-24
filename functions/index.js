/* eslint-disable */
const functions = require("firebase-functions");
const express = require("express");
const cors = require("cors");
const axios = require("axios");
const Razorpay = require("razorpay");
const generateHash = require("./generateHash");
const app = express();
app.use(cors({ origin: true }));

const instance = new Razorpay({
  key_id: functions.config().razorpay.key,
  key_secret: functions.config().razorpay.secret,
});

app.post("/", (req, res) => {
  let totalCost = 0;
  const cartItems = req.body.cartItems;

  cartItems.map((el) => {
    totalCost += parseInt(el.Cost * el.Quantity);
  });

  const options = {
    amount: totalCost * 100, // amount in the smallest currency unit
    currency: "INR",
    receipt: "order_rcptid_11",
  };

  instance.orders.create(options, function (err, order) {
    if (err) console.log(err);
    res.send(order);
  });
});

exports.createOrder = functions.https.onRequest(app);
exports.generateHash = generateHash.hashapp;
