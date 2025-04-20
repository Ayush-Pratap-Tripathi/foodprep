const userModel = require('../models/userModel');
const orderModel = require('../models/orderModel');
require('dotenv').config();
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

// Update this to your deployed frontend URL
const frontendURL = "https://foodprepuser-vip1.onrender.com";

const placeOrder = async (req, res) => {
    try {
        // 1. Create a new order
        const newOrder = await orderModel.create({
            userId: req.userId,
            items: req.body.items,
            amount: req.body.amount,
            address: req.body.address,
        });

        // 2. Clear user's cart after placing order
        await userModel.findByIdAndUpdate(req.userId, { cartData: {} });

        // 3. Prepare line items for Stripe
        const line_items = req.body.items.map(item => ({
            price_data: {
                currency: 'INR',
                product_data: {
                    name: item.name,
                },
                unit_amount: item.price * 100, // in paisa
            },
            quantity: item.quantity,
        }));

        // 4. Add delivery charge
        line_items.push({
            price_data: {
                currency: 'INR',
                product_data: {
                    name: 'Delivery Charge',
                },
                unit_amount: 20 * 100,
            },
            quantity: 1,
        });

        // 5. Create Stripe checkout session
        const session = await stripe.checkout.sessions.create({
            line_items,
            mode: 'payment',
            success_url: `${frontendURL}/verify?success=true&orderId=${newOrder._id}`,
            cancel_url: `${frontendURL}/verify?success=false&orderId=${newOrder._id}`,
        });

        res.status(200).json({ session_url: session.url });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal Server Error (Payment)" });
    }
};

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
        console.error(error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

const userOrder = async (req, res) => {
    try {
        const orders = await orderModel.find({ userId: req.userId });
        res.status(200).json({ data: orders });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

const listOrders = async (req, res) => {
    try {
        const orders = await orderModel.find({});
        res.json({ data: orders });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

const updateStatus = async (req, res) => {
    try {
        await orderModel.findByIdAndUpdate(req.body.orderId, { status: req.body.status });
        res.json({ message: "Status Updated" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

module.exports = {
    placeOrder,
    verifyOrder,
    userOrder,
    listOrders,
    updateStatus,
};
