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
    email: {
        type: String,
        required: [true, 'Email is required'],
        unique: true,
        lowercase: true,
        match: [/^\S+@\S+\.\S+$/, 'Please provide a valid email address'] // Email format validation
    },
    password: {
        type: String,
        required: [true, 'Password is required'],
        minlength: [8, 'Password must be at least 8 characters long'] // Enforce minimum password length
    },
    fullname: {
        type: String,
        required: [true, 'Full name is required'],
        trim: true // Remove unnecessary whitespaces
    },
    phone: {
        type: String,
        required: [true, 'Phone number is required'],
        match: [/^\d{10}$/, 'Please provide a valid 10-digit phone number'] // Example regex for 10-digit numbers
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

