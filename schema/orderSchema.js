const mongoose = require("mongoose");
const { Schema } = mongoose;

const printOrderSchema = new Schema({
  customerName: String,
  phoneNumber: String,
  address: String,
  deliveryDate: Date,
  orderDate: {
    type: Date,
    default: Date.now,
  },
  itemName: String,
  itemQty: Number,
  unitPrice: Number,
  totalPrice: Number,
  advancePay: Number,
  isCompletePayment: Boolean,
  orderStatus: {
    type: String,
    enum: ["confirm", "cancel", "complete"],
    default: "confirm",
  },
});
const jerseyItemSchema = new Schema({
  size: String,
  sleeveType: {
    type: String,
    enum: ["Long", "Short"],
  },
  collarType: String,
  itemQty: Number,
});
const tShirtOrderSchema = new Schema({
  customerName: String,
  phoneNumber: String,
  address: String,
  deliveryDate: Date,
  orderDate: {
    type: Date,
    default: Date.now,
  },
  sendingGarments: String,
  garmentsBill: {
    type: String,
    enum: ["pending", "paid"],
    default: "pending",
  },
  fabricType: String,
  fabricGsm: Number,
  itemName: String,
  unitPrice: Number,
  qty: Number,
  totalPrice: Number,
  advancePay: Number,
  isCompletePayment: {
    type: String,
    enum: ["complete", "inComplete"],
    default: "inComplete",
  },
  orderStatus: {
    type: String,
    enum: ["confirm", "cancel", "complete"],
    default: "confirm",
  },
  tShirtType: {
    type: String,
    enum: ["T-Shirt", "Polo-Shirt"],
  },
  data: [jerseyItemSchema],
});

module.exports = { printOrderSchema, tShirtOrderSchema };
