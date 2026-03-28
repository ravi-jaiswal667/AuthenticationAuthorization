const mongoose = require('mongoose');
const connectToDb = async () => {
    await mongoose.connect(process.env.URL);
    console.log("MongoDB is connected successfully!!");

}

module.exports = connectToDb;




