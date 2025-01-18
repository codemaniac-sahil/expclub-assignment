const mongoose = require("mongoose");
const dotenv = require('dotenv')

dotenv.config()

const MONGO_URI = process.env.MONGO_URI;

const dbConnection = () => {
    mongoose
        .connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
        .then(() => {
            console.log("Database connected Successfully");
        })
        .catch((err) => {
            console.log(`Got an err`, err);
        });
};
module.exports = dbConnection