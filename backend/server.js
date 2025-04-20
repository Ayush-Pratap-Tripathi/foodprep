const express = require('express')
const cors = require('cors')

const connectDB = require('./config/dbConn')
const foodRouter = require('./routes/foodRoute')
const userRouter = require('./routes/userRoute')
const cartRouter = require('./routes/cartRoute')
const orderRouter = require('./routes/orderRoute')

//app config
const app = express();
const PORT = process.env.PORT || 5000;
require('dotenv').config();

//middlewares
app.use(express.json());
app.use(cors());

connectDB()
//routes
app.use('/api/food', foodRouter);
app.use('/api/user', userRouter);
app.use('/api/cart', cartRouter);
app.use('/api/order', orderRouter);
app.use('/image', express.static('uploads'))

app.get('/', (req, res) => {
    res.send("API Working")
})

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`)
})