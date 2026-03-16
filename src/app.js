import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import "dotenv/config";
const app = express();


mongoose.connect(process.env.MONGO_URI)
    .then(()=>{
        console.log("Mongo connected")
    })
    .catch((err)=>{
        console.log("Connection error: ", err);
    });



app.use(express.json());
app.use(cors({
    origin: "*"
}))

app.get("/", (req, res)=>{
    res.json({status: "ok"})
});


import route from "./routes/routes.js";

app.use("/api/v1", route);


export default app;