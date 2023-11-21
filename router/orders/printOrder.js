const express = require("express");
const mongoose = require("mongoose");
const printOrder = express.Router();
const { printOrderSchema } = require("../../schema/orderSchema");

// models
const PrintOrd = mongoose.model("printOrder", printOrderSchema);

//add print order end points

printOrder.post("/save-printOrder", async (req, res) => {
  try {
    const newOrder = new PrintOrd(req.body);
    newOrder
      .save()
      .then((savedOrder) => {
        res.status(200).json({
          message: "Order saved successfully",
          data: savedOrder,
        });
      })
      .catch((error) => {
        console.error("Error saving order:", error);
      });
  } catch (err) {
    console.log(err);
  }
});
module.exports = printOrder;
