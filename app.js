const express = require('express');

const bodyParser = require('body-parser');
const userRoute = require('./routers/user.route');


const app = express();

app.use(bodyParser.json()); // for parsing application/json
//used for checking the request body

app.use('/', userRoute);
module.exports = app; // for testing 