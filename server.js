import dotenv from "dotenv";
dotenv.config({path:"./.env"});
import express from "express";
import connectDB from "./db/db.js";
import cors from "cors";
import helmet from "helmet";
import cookieParser from "cookie-parser";
import userRoutes from "./routes/userRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";
import cartRoutes from "./routes/cartRoutes.js";
import HttpError from "./middleware/HttpError.js";

const app = express();

app.use(express.json());
app.use(cors());
app.use(helmet());
app.use(cookieParser());
app.use("/user",userRoutes);
app.use("/admin",adminRoutes);
app.use("/admin",adminRoutes);
app.use("/cart",cartRoutes);

const port = process.env.PORT || 5001;

app.get("/",(req,res)=>{
    res.status(200).json("hello from server");
});

//error handling
app.use((req, res, next) => {
    next(new HttpError("requested route not found", 404));
})

//centralized error handling
app.use((error, req, res, next) => {
    if (res.headersSent) {
        return next(error);
    }
    res.status(error.statusCode || 500).json({ message: error.message || "internal server error" });

})

async function startServer() {
    try {
        await connectDB();
        app.listen(port,(err)=>{
            console.log(`server running on port ${port}`);
        })
    } catch (error) {
        console.log(error.message);
        process.exit(1);
    }
}

startServer();