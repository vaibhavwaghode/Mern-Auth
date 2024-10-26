const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();  // Ensure environment variables are available

const userRoute = require('./routes/userRoutes'); // Importing user routes

const app = express();

// Middleware for parsing JSON
app.use(express.json());

// Enable CORS with specific options
app.use(cors({
    origin: true,
    credentials: true
}));

// Health Check Route
app.get('/', (req, res) => {
    res.send("Server is running..");
});

// Use the user routes from routes/userRoutes.js
app.use('/user', userRoute); // This will load all user-related routes

// MongoDB connection
mongoose.connect(process.env.DATABASE_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(() => console.log("DB connected successfully"))
    .catch((err) => console.log("Failed to connect database ", err));

// Start the server
app.listen(3000, () => {
    console.log("Server is running on port 3000");
});


