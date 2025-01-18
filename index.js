const express = require('express')
const dotenv = require('dotenv')
const cors = require('cors')
const dbConnection = require('./database/dbconnection')
const authRoutes = require('./routes/auth')
const bookRoutes = require('./routes/book')
const cookieParser = require("cookie-parser");

dotenv.config()

const app = express()
const PORT = process.env.PORT;
app.use(cors())


app.use(cookieParser());
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/book', bookRoutes);

dbConnection()
app.listen(PORT, () => {
    console.log(`Server is running at port ${PORT}`)
})




