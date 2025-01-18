const mongoose = require('mongoose');

const bookSchema = mongoose.Schema({

    title: {
        type: String,
        required: true,
    },
    author: {
        type: String,
        required: true,
    },
    genre: {
        type: String,
        required: true,
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    image: {
        type: String,
        default: null,
    },
    imageId: {
        type: String,
        required: true,
    },

})

const book = mongoose.model('Books', bookSchema)
module.exports = book