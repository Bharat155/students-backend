import express from "express";
import {} from 'dotenv/config';
import studentRouter from "./routes/studentRoutes.js";
import teacherRouter from "./routes/teacherRoutes.js";
import errorHandler from "./middleware/errorHandler.js";
import connectDB from "./config/dbConnection.js";

const app = express();

const PORT = process.env.PORT || 2000;

connectDB();

//middlewares
app.use(express.json());
app.use("/api/students", studentRouter);
app.use("/api/teacher", teacherRouter);
app.use(errorHandler);

app.listen(PORT, () => {
    console.log(`Server running on PORT ${PORT}`);
});