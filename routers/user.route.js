// const router = require('express').Router();
// // const userService = require('../services/user.services');
// const userControl = require('../controller/user.controller');
// router.post('/register', userControl.register);//register user

// module.exports = router;


const router = require('express').Router();
const userControl = require('../controller/user.controller');
router.post('/registration', userControl.register);//register user
module.exports = router;