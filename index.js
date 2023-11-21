// external imports
const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
// internal imports
const {
  notFoundHandler,
  errorHandler,
} = require("./middlewares/common/errorHandlers");
const printOrder = require("./router/orders/printOrder");
const jerseyOrder = require("./router/orders/jerseyOrder");
// req parser and app
dotenv.config();
const app = express();
app.use(express.json());

mongoose
  .connect(process.env.MONGO_DB_STRING)
  .then(() => console.log("Mongos are connected"))
  .catch((err) => console.log(err));

// print order router
app.use("/print-order", printOrder);

// jersey Order router
app.use("/jersey-order", jerseyOrder);

// 404 not found error handler
app.use(notFoundHandler);

// error handler
app.use(errorHandler);

app.listen(process.env.PORT, () => {
  console.log(`application running on port ${process.env.PORT}`);
});
