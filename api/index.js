const express = require("express");
const app = express();
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const cors = require("cors");
dotenv.config();
mongoose.set("strictQuery", false);
const authRoute = require("./routes/auth");
const cartRoute = require("./routes/cart");
const orderRoute = require("./routes/order");
const productRoute = require("./routes/product");
const userRoute = require("./routes/user");
const stripeRoute = require("./routes/stripe");
mongoose
  .connect(process.env.MONGO_SEC)
  .then(() => {
    console.log("DB connection successful");
  })
  .catch((err) => {
    console.error(err);
  });

app.use(cors())
app.use(express.json());

app.use("/api/auth", authRoute);
app.use("/api/users", userRoute);
app.use("/api/products", productRoute);
app.use("/api/carts", cartRoute);
app.use("/api/orders", orderRoute);
app.use("/api/checkout", stripeRoute);

app.listen(process.env.PORT || 3000, () => {
  console.log("backend server is running");
});
