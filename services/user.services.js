const userModel = require('../model/user.model');
const jwt = require('jsonwebtoken');

class userService{
    static async registerUser(fullname, email, password, phone){
        try{
            const createUser = new userModel({fullname, email, password, phone});
            return await createUser.save();

        }catch (error) {
            if (error.name === 'ValidationError') {
                const messages = Object.values(error.errors).map(err => err.message);
                throw new Error(`Validation Error: ${messages.join(', ')}`);
            }
            throw new Error('Error creating user: ' + error.message);
        }
    }
    static async checkUser(email){
        try{
            return await userModel.findOne({email});
        }catch (error) {
            throw new Error('Error checking user: ' + error.message);
        }
    }

    static async generateToken(tokenData, secretKey, jwt_expiry){
        try{
            return jwt.sign(tokenData, secretKey, {expiresIn:jwt_expiry});
        }catch (error) {
            throw new Error('Error generating token: ' + error.message);
        }
    }

}

module.exports = userService;




