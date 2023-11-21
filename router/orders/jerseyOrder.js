const express = require("express");
const mongoose = require("mongoose");
const jerseyOrder = express.Router();
const { tShirtOrderSchema } = require("../../schema/orderSchema");

// models
const JerseyOrd = mongoose.model("jerseyOrder", tShirtOrderSchema);

// get jersey order
jerseyOrder.get("/get-jerseyOrders", async (req, res) => {
  try {
    let query = {};
    if (req.query.fromDate && req.query.toDate) {
      query.orderDate = {
        $gte: new Date(req.query.fromDate),
        $lte: new Date(req.query.toDate),
      };
    }
    if (req.query.type === "1") {
      query.isCompletePayment = "inComplete";
    }
    if (req.query.type === "2") {
      query.isCompletePayment = "complete";
    }
    // console.log(query);
    const ordersData = await JerseyOrd.find(query);
    res.status(200).json({
      message: "Filtered orders retrieved successfully",
      data: ordersData,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Error retrieving orders",
      err: err.message,
    });
  }
});

//add print order end points
jerseyOrder.post("/save-jerseyOrder", async (req, res) => {
  try {
    const newOrder = new JerseyOrd(req.body);
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
module.exports = jerseyOrder;
