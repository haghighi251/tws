import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import authRouter from "./routes/auth.js";
import usersRouter from "./routes/users.js";
import hotelsRouter from "./routes/hotels.js";
import roomsRouter from "./routes/rooms.js";
import cookieParser from "cookie-parser";
import cors from "cors";

const app = express();
dotenv.config();

const connect = async () => {
    try {
        await mongoose.connect(process.env.MONGO);
        console.log("Connected to MongoDb! by: " + process.env.MONGO);
    } catch (error) {
        throw error;
    }
};

mongoose.connection.on("disconnected", () => {
    console.log("Mongoose disconected.");
});

//Middlewares
app.use(cors());
app.use(cookieParser());
app.use(express.json());
app.use('/api/auth', authRouter);
app.use('/api/users', usersRouter);
app.use('/api/hotels', hotelsRouter);
app.use('/api/rooms', roomsRouter);

//To handle errors on console.log
app.use((err, req, res, next) => {
    let errorStatus = err.status || 500;
    let errorMessage = err.message || 'Something went wrong.';
    return res.status(errorStatus).json({
        sucess: false,
        status: errorStatus,
        message: errorMessage,
        stack: err.stack
    });
});

app.listen(8000, () => {
    connect();
    console.log("Connected to backend!");
})