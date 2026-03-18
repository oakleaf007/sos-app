import express from "express";

import { nearbyFetch } from "../controllers/nearbyFetch.js";

import { signUp } from "../controllers/userController.js";

const route = express.Router();


route.get("/test",(req, res)=>{
    res.send("api route is working");
});

route.get("/nearbyfetch",nearbyFetch);
route.post("/signup", signUp);

export default route;