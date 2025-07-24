require('dotenv').config();
const express = require('express');
const cors = require('cors');
const dbConnect = require('./config/dbConnection');
require('./config/cloudinary')
const userRouter = require('./routes/userRoutes');
const serviceRouter = require('./routes/serviceRoutes');
const categoryRouter = require('./routes/categoryRoutes');
const bookingRouter = require('./routes/BookingRoutes');

dbConnect();

const server = express();

// middlewares
server.use(cors());
server.use(express.json());

// routes
server.use('/api/users', userRouter);
server.use('/api/services', serviceRouter);
server.use('/api/categories', categoryRouter);
server.use('/api/bookings', bookingRouter);

server.get('/', (req, res) => {
  res.status(200).json(`Welcome To Servana Server , Currently Working Fine timestamp : ${Date.now()}`);
});

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
    console.log(`server running on port ${PORT}`)
})


