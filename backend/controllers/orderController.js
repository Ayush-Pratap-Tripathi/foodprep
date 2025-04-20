const userModel = require('../models/userModel')
const orderModel = require('../models/orderModel')
require('dotenv').config()
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY)

const placeOrder = async (req, res) => {
    // const frontendURL = "http://localhost:5173"
    const frontendURL = "https://foodprepuser-vip1.onrender.com"
    try {
        const newOrder = await orderModel.create({
            userId: req.userId,
            items: req.body.items,
            amount: req.body.amount,
            address: req.body.address,
        })
        await userModel.findByIdAndUpdate(req.userId, { cartData: {} })

        const line_items = req.body.items.map((item) => ({
            price_data: {
                currency: 'INR',
                product_data: {
                    name: item.name,
                },
                unit_amount: item.price * 100
            },
            quantity: item.quantity
        }))

        line_items.push({
            price_data: {
                currency: 'INR',
                product_data: {
                    name: 'Delivery Charge',
                },
                unit_amount: 20 * 100
            },
            quantity: 1
        })

        const session = await stripe.checkout.sessions.create({
            line_items,
            mode: 'payment',
            success_url: `${frontendURL}/verify?success=true&orderId=${newOrder._id}`, cancel_url: `${frontendURL}/verify?success=false&orderId=${newOrder._id}`,
        })

        res.status(200).json({ session_url: session.url })

    } catch (error) {
        console.log(error)
        res.status(500).json({ message: "Internal Server Error(Payment)" })
    }
}

const verifyOrder = async (req, res) => {
    const { orderId, success } = req.body
    try {
        if (success == 'true') {
            await orderModel.findByIdAndUpdate(orderId, { payment: true })
            res.status(200).json({ message: "Payment successful" })
        }
        else {
            await orderModel.findByIdAndDelete(orderId)
            res.status(204).json({ message: "Payment Failed" })
        }
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: "Internal Server Error" })
    }
}

const userOrder = async (req, res) => {
    try {
        const orders = await orderModel.find({ userId: req.userId })
        res.status(200).json({ data: orders })
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: "Internal Server Error" })

    }
}

const listOrders = async (req, res) => {
    try {
        const orders = await orderModel.find({})
        res.json({ data: orders })
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: "Internal Server Error" })
    }
}

const updateStatus = async (req, res) => {
    try {
        await orderModel.findByIdAndUpdate(req.body.orderId, { status: req.body.status })
        res.json({ message: "Status Updated" })
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: "Internal Server Error" })
    }
}

module.exports = { placeOrder, verifyOrder, userOrder, listOrders, updateStatus }