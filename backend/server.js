const express = require("express");
const { errorHandler } = require("./middleware/errorHandler");
const dotenv = require("dotenv");
const colors = require("colors");
const connectDB = require("./config/db");
dotenv.config();

connectDB();

const app = express();

// Middleware to parse incoming JSON requests and populate req.body
app.use(express.json());

// Middleware to parse incoming URL-encoded data and populate req.body
app.use(express.urlencoded({ extended: false }));

app.use("/api/goals", require("./routes/goalRoutes"));

app.use("/api/users", require("./routes/userRoutes"));

app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server running on PORT ${PORT}`.yellow));
