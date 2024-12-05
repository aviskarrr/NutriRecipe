const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const db = require('../config/database');

const { Schema } = mongoose;
//old schema without hashing
// const userSchema = new Schema({
//     email:{
//         type:String,
//         required:true,
//         unique:true,
//         lowercase:true
//     },
//     password:{
//         type:String,
//         required:true
//     }
// });
//new schema with hashing
//we will use a library called bcrypt to hash the password
const userSchema = new Schema({
    email:{
        type:String,
        required:true,
        unique:true,
        lowercase:true
    },
    password:{
        type:String,
        required:true
    }
});

userSchema.pre('save', async function(next){
    try{
        const salt = await bcrypt.genSalt(10);//generate a salt
        const hashedPassword = await bcrypt.hash(this.password, salt);
        this.password = hashedPassword;
        next();
    }catch(error){
        next(error);
    }
});

userSchema.methods.isValidPassword = async function(newPassword){
    try{
        return await bcrypt.compare(newPassword, this.password);
    }catch(error){
        throw new Error(error);
    }
}


const useModel = db.model('User', userSchema);

module.exports = useModel;

