import express from "express";


const route = express.Router();


route.get("/test",(req, res)=>{
    res.send("api route is working");
});


export default route;