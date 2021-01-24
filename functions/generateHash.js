/* eslint-disable */

const functions = require("firebase-functions");
const express = require("express");
const hmacSHA256 = require("crypto-js/hmac-sha256");
const cors = require("cors");

const hashapp = express();
hashapp.use(cors({ origin: true }));

hashapp.post("/", (req, res) => {
  const generatedSignature = hmacSHA256(
    req.body.orderId + "|" + req.body.paymentId,
    functions.config().razorpay.secret
  ).toString();
  res.send(generatedSignature);
});

exports.hashapp = functions.https.onRequest(hashapp);
