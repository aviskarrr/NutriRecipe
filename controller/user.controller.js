const userService = require('../services/user.services');

exports.register = async (req, res, next) => {
    try {
        console.log('Headers:', req.headers); // Log headers to confirm content type
        console.log('Request body:', req.body); // Log raw request body
        const { email, password } = req.body;

        if (!email || !password) {
            throw new Error('Email and password are required.');
        }

        const successRes = await userService.registerUser(email, password);

        res.json({
            success: true,
            message: 'User registered successfully'
        });
    } catch (error) {
        console.error('Error in registration:', error);
        next(error);
    }
};


exports.login = async (req, res, next) => {
    try {
        console.log('Headers:', req.headers); // Log headers to confirm content type
        console.log('Request body:', req.body); // Log raw request body
        const { email, password } = req.body;
        const user = await userService.checkUser(email);

        if(!user){
            throw new Error('User not found');
        }
        const isMatch = await user.isValidPassword(password);

        if(isMatch===false){
            throw new Error('Invalid password');
        }


        let tokenData = {_id:user._id, email:user.email};


        const token = await userService.generateToken(tokenData, "secretKey", '1h');

        res.status(200).json({status:true,token:token})
    } catch (error) {
        console.error('Error in registration:', error);
        next(error);
    }
};
