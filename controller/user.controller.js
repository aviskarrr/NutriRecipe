// const userService = require('../services/user.services');

// exports.register = async(req, res, next)=>{
//     try{
//         console.log('Request body:', req.body);
//         const {email, password} = req.body;

//         const successRes = await userService.registerUser(email, password);

//         res.json({
//             success:true,
//             message:'User registered successfully',
//             data:successRes
//         });

//     }catch(error){
//         next(error);
//     }
// };



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
            message: 'User registered successfully',
            data: successRes,
        });
    } catch (error) {
        console.error('Error in registration:', error);
        next(error);
    }
};
