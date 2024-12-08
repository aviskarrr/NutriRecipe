const userService = require('../services/user.services');

exports.register = async (req, res, next) => {
    try {
        console.log('Headers:', req.headers); // Log headers to confirm content type
        console.log('Request body:', req.body); // Log raw request body

        const { fullname, email, password, phone } = req.body;

        // Basic validation for required fields
        if (!email || !password || !fullname || !phone) {
            return res.status(400).json({
                success: false,
                message: 'All fields (fullname, email, password, phone) are required.'
            });
        }

        // Call the service to register user
        const successRes = await userService.registerUser(fullname, email, password, phone);

        res.status(201).json({
            success: true,
            message: 'User registered successfully',
            data: {
                id: successRes._id,
                fullname: successRes.fullname,
                email: successRes.email
            }
        });
    } catch (error) {
        console.error('Error in registration:', error);
        if (error.name === 'ValidationError') {
            // Handle validation error from Mongoose schema
            const messages = Object.values(error.errors).map(err => err.message);
            return res.status(400).json({
                success: false,
                message: 'Validation Error',
                errors: messages
            });
        }
        next(error); // For any other unhandled errors
    }
};



exports.login = async (req, res, next) => {
    try {
        console.log('Headers:', req.headers); // Log headers to confirm content type
        console.log('Request body:', req.body); // Log raw request body

        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({
                success: false,
                message: 'Email and password are required.'
            });
        }

        // Check if user exists
        const user = await userService.checkUser(email);
        if (!user) {
            return res.status(404).json({
                success: false,
                message: 'User not found'
            });
        }

        // Verify password
        const isMatch = await user.isValidPassword(password);
        if (!isMatch) {
            return res.status(401).json({
                success: false,
                message: 'Invalid password'
            });
        }

        // Generate JWT token
        const tokenData = { _id: user._id, email: user.email };
        const token = await userService.generateToken(tokenData, 'secretKey', '1h');

        res.status(200).json({
            success: true,
            message: 'Login successful',
            token: token
        });
    } catch (error) {
        console.error('Error in login:', error);
        next(error); // Pass the error to middleware
    }
};

