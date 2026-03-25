import { createClient } from "redis";


const redisClient = createClient({
    url : process.env.REDIS_URL
});

redisClient.on("error",(err)=>{
    console.log("error with redis client ", err);
});

let isConnected = false;

export const connectRedis = async()=>{
    if(!isConnected){
        await redisClient.connect();
console.log("redis connected");

isConnected=true;
    }
}


export default redisClient;