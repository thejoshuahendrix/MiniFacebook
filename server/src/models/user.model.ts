import * as mongoose from "mongoose";

export interface UserI {
    username:string;
    password:string;
    email:string;
}

const UserSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true,
        unique: true
    },
    password:{
        type: String,
        required: true
    },
    register_date: {
        type: Date,
        default: Date.now
    }
    
});

export const User = mongoose.model('user', UserSchema);