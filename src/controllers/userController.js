import User from '../models/userSchema.js';
import bcrypt from 'bcrypt';

export const signUp = async (req,res)=>{
    try{
        const {name, phone,email, password} = req.body;
        if (!name || !phone || !email || !password) {
            return res.status(400).json({ message: "All fields are required" });
        }

        const existingUser = await User.findOne({email});
        if(existingUser) return res.status(409).json({message: "user already exist"});

        const salty = 10;
        const hashedPass = await bcrypt.hash(password,salty);
        const user = await User.create({
            name,
            email,
            phone,
            password: hashedPass
            
        });
        res.status(201).json({success:true, message: "user created successfully"});
    }catch(error){
        console.error(error);
        res.status(500).json({message: error.message});

    }
}
