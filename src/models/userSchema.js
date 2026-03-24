import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: { type: String, required: true},
    email: { type: String, required: true, unique: true, lowercase: true},
    phone: {type: String, required: true},
    password:{type: String, required: true},
    role:{ type: String, enum: ["user", "volunteer"], default:"user"},
    location:{
        type:{
            type: String,
            enum : ["Point"],
            default: "Point"
        },
        coordinates:{
            type:[Number],
            default: [0,0]
        }
      
    },
    lastActive: Date,
    isActive:{
        type:Boolean,
        default:false
    },
   
},{timestamps:true});

userSchema.index({location : "2dsphere"});
export default mongoose.model("User", userSchema);