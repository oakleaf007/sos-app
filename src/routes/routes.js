import express from "express";

import { nearbyFetch } from "../controllers/nearbyFetch.js";
const route = express.Router();


route.get("/test",(req, res)=>{
    res.send("api route is working");
});

route.get("/nearbyfetch",nearbyFetch);


export default route;