const mongoose = require('mongoose');
const db = require('../config/database');

const { Schema } = mongoose;

const userSchema = new Schema({
    email:{
        type:String,
        required:true,
        unique:true,
        lowercase:true
    },
    password:{
        type:String,
        required:true,
        unique:true
    }
});

const useModel = db.model('User', userSchema);

module.exports = useModel;