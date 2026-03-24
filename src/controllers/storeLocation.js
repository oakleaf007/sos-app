import User from "../models/userSchema.js";

export const storeLocation = async( req, res)=>{
   

    try{
         const {id, lat, lng }= req.body;

         if(!id ){
            return res.status(400).json({message: "no id recieved"});
         }

        await User.findByIdAndUpdate(id,{
            location:{
                type: "Point",
                coordinates : [lng, lat]
            },
            lastActive: new Date()
         });
         return res.status(200).json({sucess:true, message : "location updated" });




    }catch(err){
        console.error(err);
        return res.status(500).json({message: err.message});
    }
} 