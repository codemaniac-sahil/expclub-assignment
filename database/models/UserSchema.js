const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    books: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Book',
        }
    ],
    sentRequests: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'ExchangeRequest',
        }
    ],
    receivedRequests: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'ExchangeRequest',
        }
    ]
})

const user = mongoose.model('Users', userSchema)

module.exports = user