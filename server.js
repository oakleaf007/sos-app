import app from "./src/app.js";
import "dotenv/config";
import http from "http";
import {Server } from "socket.io";
import { connectRedis } from "./src/config/redis.js";
import redisClient from "./src/config/redis.js";
import { addUser, removeUserBySocket } from "./src/socket/socketmanager.js";
import { handleLocationUpdate } from "./src/socket/locationHandler.js";


const PORT = process.env.PORT;

const server = http.createServer(app);

const io = new Server(server, {
    cors: {origin : "*"},
    transports: ["websocket","polling"]
});

await connectRedis();

io.on("connection",(socket)=>{
    console.log("user connected", socket.id);

    socket.on("register",async (userId)=>{
        addUser(userId, socket.id);
        socket.userId = userId; 
         try {
     
      const pos = await redisClient.geoPos("users", userId);

      if (!pos || !pos[0]) return;

      const lng = pos[0].longitude;
      const lat = pos[0].latitude;

     
      const nearByUsers = await redisClient.geoSearch(
        "users",
        { longitude: lng, latitude: lat },
        { radius: 5, unit: "km" }
      );

      const usersData = [];

      for (let id of nearByUsers) {
        if (String(id) === String(userId)) continue;

        const coords = await redisClient.geoPos("users", id);

        if (coords && coords[0]) {
         const uLng = coords[0].longitude;
const uLat = coords[0].latitude;

          usersData.push({
            userId: id,
            lat: uLat,
            lng: uLng,
          });
        }
      }

      
      socket.emit("nearby:list", usersData);

    } catch (err) {
      console.error("initial nearby error:", err);
    }
    });

    socket.on("location:update",(data)=>{
        console.log(data);
        handleLocationUpdate(io, data);
        
    });
    socket.on("disconnect", async()=>{

        const userId = socket.userId;

        if(userId){
            removeUserBySocket(socket.id);
              await redisClient.zRem("users", userId);

   
    await redisClient.del(`active:${userId}`);
        }
        socket.broadcast.emit("user:offline", {userId});
        

    });
});




server.listen(PORT,"0.0.0.0",()=>{
    console.log(`server is running at http://localhost:${PORT}`);
})