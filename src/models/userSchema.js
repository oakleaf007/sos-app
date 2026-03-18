import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: { type: String, required: true},
    email: { type: String, required: true, unique: true, lowercase: true},
    phone: {type: String, required: true},
    password:{type: String, required: true},
    role:{ type: String, enum: ["user", "volunteer"], default:"user"},
    location:{
        lat:Number, lon: Number
    },
    isActive:{
        type:Boolean,
        default:false
    },
   
},{timestamps:true});

export default mongoose.model("User", userSchema);