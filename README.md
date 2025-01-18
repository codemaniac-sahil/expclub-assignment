
# 📚 Book Exchange Platform  

A MERN stack-based platform that allows users to create accounts, list books for exchange, find matches, and initiate book exchanges.  

## 🚀 Features  

- **User Authentication**: Secure registration, login, and logout  
- **Book Management**: Add, edit, and remove books for exchange  
- **Exchange Requests**: Send and receive book exchange requests  


## 🏗️ Tech Stack  

- **Frontend**: React.js (with an existing CSS library for UI)  
- **Backend**: Node.js, Express.js  
- **Database**: MongoDB (with Mongoose)  
- **Authentication**: JWT for secure authentication  


## 🔧 Installation & Setup  

### Prerequisites  
- Node.js & npm installed  
- MongoDB instance (local or cloud e.g., MongoDB Atlas)  

### Backend Setup  
```bash
git clone https://github.com/codemaniac-sahil/expclub-assignment.git
cd expclub-assignment
npm install
```

Create a `.env` file in the backend directory with:  
```env
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
PORT=5000
```

Run the backend:  
```bash
npm start
```


## 📌 API Endpoints  

| Method | Endpoint | Description |
|--------|---------|-------------|
| POST | `/api/auth/register` | Register a new user |
| POST | `/api/auth/login` | User login |
| GET | `/api/books` | Get all listed books |
| POST | `/api/books` | Add a new book |
| PUT | `/api/books/:id` | Edit a book |
| DELETE | `/api/books/:id` | Remove a book |
| GET | `/api/matches` | Get book matches |
| POST | `/api/exchange` | Initiate a book exchange request |



## 💡 Future Enhancements  
- Real-time notifications for book exchange requests  
- Chat feature between users  
- Book reviews & ratings  



