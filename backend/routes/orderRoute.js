const express = require('express')
const orderRouter = express.Router();
const { placeOrder, verifyOrder, userOrder, listOrders, updateStatus } = require('../controllers/orderController')
const authMiddleware = require('../middlewares/auth')

orderRouter.post("/place", authMiddleware, placeOrder)
orderRouter.post("/verify", verifyOrder)
orderRouter.get("/userorder", authMiddleware, userOrder)
orderRouter.get("/listorders", listOrders)
orderRouter.post("/status", updateStatus)

module.exports = orderRouter