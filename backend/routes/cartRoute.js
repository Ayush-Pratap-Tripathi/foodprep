const express = require("express");
const cartRouter = express.Router();
const {
  addToCart,
  getCart,
  removeFromCart,
} = require("../controllers/cartController");
const authMiddleware = require("../middlewares/auth");

cartRouter.use(authMiddleware);

cartRouter.post("/add", addToCart);
cartRouter.get("/get", getCart);
cartRouter.delete("/remove", removeFromCart);

module.exports = cartRouter;