const mongoose = require('mongoose');

const dbConnect = async() => {
    try {
        mongoose.connect(process.env.MONGO_URI);
        console.log('server Connected to Servana-cluster at Mongo_Atlas');
    } catch(error) {
        console.error(`MongoDb connection Failed : ${error}`)
    }
}

module.exports = dbConnect;