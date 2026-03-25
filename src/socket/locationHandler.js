import redisClient from "../config/redis.js";
import { getSocketByUser } from "./socketmanager.js";



export const handleLocationUpdate = async(io, data)=>{
    const {userId, lat, lng} = data;


    try{
        await redisClient.geoAdd("users",{
            longitude: lng,
            latitude: lat,
            member: userId
        });

        await redisClient.set(`active:${userId}`, "1",{
            EX: 15
        });


        const nearByUsers = await redisClient.geoSearch(
            "users",
            {
                longitude:lng,
                latitude: lat,

            },
            {radius: 5, unit: "km"}
        );

        for(let id of nearByUsers){
            if(String(id)===String(userId)) continue;
            const isActive = await redisClient .get(`active:${id}`);
            if(!isActive) continue;

            const targetSocket = getSocketByUser(id);
            if(targetSocket){
                io.to(targetSocket).emit("nearby:update",{
                    userId,
                    lat,
                    lng
                });
            }
        }



    }catch( err){
        console.error("Location handler error: ", err)
    }
}