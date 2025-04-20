const userModel = require('../models/userModel')
const orderModel = require('../models/orderModel')
require('dotenv').config()
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY)

const placeOrder = async (req, res) => {
    // Determine the correct frontend URL based on environment
    let frontendURL;

    if (process.env.NODE_ENV === 'production') {
        // Check if the request is from the user or admin frontend
        if (req.body.isAdmin) {
            frontendURL = "https://foodprep-admin.vercel.app"; // Admin frontend
        } else {
            frontendURL = "https://foodprep-user.vercel.app"; // User frontend
        }
    } else {
        frontendURL = "http://localhost:5000"; // Localhost for local testing
    }

    try {
        // Create new order in DB
        const newOrder = await orderModel.create({
            userId: req.userId,
            items: req.body.items,
            amount: req.body.amount,
            address: req.body.address,
        });
        
        // Empty cart after order placement
        await userModel.findByIdAndUpdate(req.userId, { cartData: {} });

        // Prepare line items for Stripe payment session
        const line_items = req.body.items.map((item) => ({
            price_data: {
                currency: 'INR',
                product_data: {
                    name: item.name,
                },
                unit_amount: item.price * 100
            },
            quantity: item.quantity
        }));

        line_items.push({
            price_data: {
                currency: 'INR',
                product_data: {
                    name: 'Delivery Charge',
                },
                unit_amount: 20 * 100
            },
            quantity: 1
        });

        // Create Stripe checkout session
        const session = await stripe.checkout.sessions.create({
            line_items,
            mode: 'payment',
            success_url: `${frontendURL}/verify?success=true&orderId=${newOrder._id}`,
            cancel_url: `${frontendURL}/verify?success=false&orderId=${newOrder._id}`,
        });

        // Respond with session URL for payment
        res.status(200).json({ session_url: session.url });

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal Server Error (Payment)" });
    }
}

const verifyOrder = async (req, res) => {
    const { orderId, success } = req.body;
    try {
        if (success === 'true') {
            await orderModel.findByIdAndUpdate(orderId, { payment: true });
            res.status(200).json({ message: "Payment successful" });
        } else {
            await orderModel.findByIdAndDelete(orderId);
            res.status(204).json({ message: "Payment Failed" });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal Server Error" });
    }
}

const userOrder = async (req, res) => {
    try {
        const orders = await orderModel.find({ userId: req.userId });
        res.status(200).json({ data: orders });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal Server Error" });
    }
}

const listOrders = async (req, res) => {
    try {
        const orders = await orderModel.find({});
        res.json({ data: orders });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal Server Error" });
    }
}

const updateStatus = async (req, res) => {
    try {
        await orderModel.findByIdAndUpdate(req.body.orderId, { status: req.body.status });
        res.json({ message: "Status Updated" });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal Server Error" });
    }
}

module.exports = { placeOrder, verifyOrder, userOrder, listOrders, updateStatus };
