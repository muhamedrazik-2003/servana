require('dotenv').config();
const express = require('express');
const cors = require('cors');
const dbConnect = require('./config/dbConnection');
require('./config/cloudinary')
const userRouter = require('./routes/userRoutes');
const serviceRouter = require('./routes/serviceRoutes');
const categoryRouter = require('./routes/categoryRoutes')

dbConnect();

const server = express();

// middlewares
server.use(cors());
server.use(express.json());

// routes
server.use('/api/users', userRouter);
server.use('/api/services', serviceRouter);
server.use('/api/categories', categoryRouter);

// console.log("Cloudinary Config:", {
//   cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
//   api_key: process.env.CLOUDINARY_KEY,
//   api_secret: process.env.CLOUDINARY_SECRET ? "loaded" : "missing"
// });

server.get('/', (req, res) => {
  res.status(200).json(`Welcome To Servana Server , Currently Working Fine timestamp : ${Date.now()}`);
});

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
    console.log(`server running on port ${PORT}`)
})


