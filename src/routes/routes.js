import express from "express";

import { nearbyFetch } from "../controllers/nearbyFetch.js";

import { signUp, signin } from "../controllers/userController.js";
import { storeLocation } from "../controllers/storeLocation.js";
const route = express.Router();


route.get("/test",(req, res)=>{
    res.send("api route is working");
});

route.get("/nearbyfetch",nearbyFetch);
route.post("/signup", signUp);
route.post("/signin", signin);
route.post("/storelocation", storeLocation);
export default route;