const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const dbConnect = require('./config/dbConnection');
const userRouter = require('./routes/userRoutes');

dotenv.config();
dbConnect();

const server = express();

// middlewares
server.use(cors());
server.use(express.json());

// routes
server.use('/api/users', userRouter)


server.get('/', (req, res) => {
  res.status(200).json(`Welcome To Servana Server , Currently Working Fine timestamp : ${Date.now()}`);
});

const PORT = 3000 || process.env.PORT;
server.listen(PORT, () => {
    console.log(`server running on port ${PORT}`)
})