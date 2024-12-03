const userService = require('../services/user.services');

exports.register = async(req, res, next)=>{
    try{
        const {email, password} = req.body;

        const successRes = await userService.registerUser(email, password);

        res.json({
            success:true,
            message:'User registered successfully',
            data:successRes
        });
    }catch(error){
        next(error);
    }
};

