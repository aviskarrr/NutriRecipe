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


    // static async deleteUser(userId, requestingUserId, isAdmin = false) {
    //     try {
    //         const user = await userModel.findById(userId);//find user by id
    //         if (!user) {
    //             throw new Error('User not found');
    //         }
    
    //         // Check if the requester is authorized
    //         if (userId !== requestingUserId && !isAdmin) {
    //             throw new Error('Unauthorized: You can only delete your own account');
    //         }
    
    //         // Delete the user
    //         await userModel.findByIdAndDelete(userId);
    //         return { message: 'User successfully deleted' };
    //     } catch (error) {
    //         throw new Error('Error deleting user: ' + error.message);
    //     }
    // }


}

module.exports = userService;