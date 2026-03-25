const userSocketMap = new Map();

export const addUser = (userId, socketId)=>{
    userSocketMap.set(userId, socketId);
}

export const removeUserBySocket = (socketId)=>{
    for( let [userId, sockId] of userSocketMap){
        if(sockId === socketId){
            userSocketMap.delete(userId);
            break;
        }
    }
};


export const getSocketByUser = (userId)=>{
    return userSocketMap.get(userId);
}