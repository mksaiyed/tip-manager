const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
require("dotenv").config();

const { logReqRes } = require("./middlewares");
const { connectMongoDb } = require("./database/connection");
const userRouter = require("./routes/userRoutes");
const tipRouter = require("./routes/tipRoutes");

const MONGODB_URL = process.env.MONGODB_URL;
const PORT = process.env.PORT;
const FRONTEND_URL = process.env.FRONTEND_URL;

const app = express();

// connection
connectMongoDb(MONGODB_URL);

// Middleware to Allows all origins temporarily
// app.use(cors());
// Middleware to allow only frontend domain
app.use(
    cors({
        origin: FRONTEND_URL,
    })
);
// Middleware to add logs for every request
app.use(logReqRes("./logs/logs.txt"));

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Routes
app.use("/api", userRouter);
app.use("/api", tipRouter);

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
