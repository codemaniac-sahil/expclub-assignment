const User = require('../database/models/UserSchema')
const Book = require('../database/models/BookSchema')
const cloudinary = require('../middleware/cloudinary')

exports.createBooks = async (req, res) => {
    try {
        const result = await cloudinary.uploader.upload(req.file.path);
        const token = req.cookies.token;
        console.log(token);
        if (!token) {
            return res.json({ status: false });
        }



        const verifiedUser = jwt.verify(token, process.env.TOKEN_KEY);

        const userId = verifiedUser.id;



        const { title, author, genre } = req.body;
        const newBook = new Book({
            title,
            author,
            genre,
            owner: userId,
            image: result.secure_url,
            imageId: result.public_id
        });

        const savedBook = await newBook.save();


        await User.findByIdAndUpdate(
            userId,
            { $push: { books: savedBook._id } },
            { new: true }
        );

        res.status(201).json({ msg: 'Book listed successfully', book: savedBook });
    } catch (error) {
        console.error('Error creating book:', error);
        res.status(500).json({ msg: 'Server error', error });
    }
}

exports.getBooks = async (req, res) => {
    try {
        const books = await Book.find().populate('owner', 'name');

        res.status(200).json(books);
    } catch (error) {
        res.status(500).json({ msg: 'Server error', error });
    }
};


exports.getBookById = async (req, res) => {
    try {
        const book = await Book.findById(req.params.id).populate('owner', 'name');
        if (!book) {
            return res.status(404).json({ msg: 'Book not found' });
        }
        res.status(200).json(book);
    } catch (error) {
        res.status(500).json({ msg: 'Server error', error });
    }
};


exports.updateBook = async (req, res) => {
    try {

        const token = req.cookies.token;
        console.log(token);
        if (!token) {
            return res.json({ status: false });
        }

        const { title, author, genre } = req.body;
        let book = await User.findById(req.params.id);
        await cloudinary.uploader.destroy(book.imageId);

        if (req.file) {
            result = await cloudinary.uploader.upload(req.file.path);
        }
        const updatedBook = await Book.findByIdAndUpdate(
            req.params.id,
            {
                title, author, genre, image: result.secure_url
            },
            { new: true } // Return the updated document
        );

        if (!updatedBook) {
            return res.status(404).json({ msg: 'Book not found' });
        }
        res.status(200).json(updatedBook);
    } catch (error) {
        res.status(500).json({ msg: 'Server error', error });
    }
};

// Delete a book
exports.deleteBook = async (req, res) => {
    try {

        const token = req.cookies.token;
        console.log(token);
        if (!token) {
            return res.json({ status: false });
        }


        let book = await User.findById(req.params.id);
        await cloudinary.uploader.destroy(book.imageId);

        const deletedBook = await Book.findByIdAndDelete(req.params.id);
        if (!deletedBook) {
            return res.status(404).json({ msg: 'Book not found' });
        }
        res.status(200).json({ msg: 'Book deleted successfully' });
    } catch (error) {
        res.status(500).json({ msg: 'Server error', error });
    }
};

exports.getBooksByUserId = async (req, res) => {
    try {
        const userId = req.params.userId;

        // Find the user by ID and populate their books with all fields
        const user = await User.findById(userId).populate('books');

        if (!user) {
            return res.status(404).json({ msg: 'User not found' });
        }

        // Check if the user has any books
        if (!user.books || user.books.length === 0) {
            return res.status(200).json([]); // Return an empty array with a 200 status code
        }

        // Send the populated books as the response
        res.status(200).json(user.books);
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: 'Server error', error });
    }
};