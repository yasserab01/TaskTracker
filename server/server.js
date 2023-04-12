import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from "cors";
import authRoutes from "./Routes/User.js";
import boardRoutes from "./Routes/Board.js";
import taskRoutes from "./Routes/Task.js";

const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: true })); // middleware to parse incoming URL-encoded data
app.use(cors());

/* ROUTES */
app.use("/auth", authRoutes);
app.use("/boards", boardRoutes);
app.use("/", taskRoutes);


//database
dotenv.config()
const port = process.env.PORT || 5000;
const dbConnectionString = process.env.DB_CONNECTION_STRING;

mongoose.connect(dbConnectionString, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('MongoDB Connected'))
.catch(err => console.log('MongoDB connection error:', err));

app.listen(port, () => console.log(`Server listening on port ${port}`));