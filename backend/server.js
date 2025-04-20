const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config(); // Load env vars early

const app = express();
app.use(cors());
app.use(express.json());
app.use('/Uploads', express.static('Uploads')); // Serve static uploads

// Example MongoDB connection
mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

// Routes go here
app.get('/', (req, res) => {
  res.send('Server is running...');
});

// Example route placeholder
// const itemRouter = require('./routes/itemRoute');
// app.use('/api/items', itemRouter);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
