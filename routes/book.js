const express = require('express');
const { getBooks, createBooks, getBookById, updateBook, deleteBook, getBooksByUserId } = require('../controller/Books');
const upload = require('../middleware/upload');

const router = express.Router()


router.get('/', getBooks);
router.post('/create', upload.single('image'), createBooks);
router.get('/:id', getBookById);
router.put('/:id', upload.single('image'), updateBook);
router.delete('/:id', deleteBook);
router.get('/user/:userId', getBooksByUserId);

module.exports = router