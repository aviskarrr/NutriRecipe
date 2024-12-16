// const express = require('express');

// const bodyParser = require('body-parser');
// const userRoute = require('./routers/user.route');


// const app = express();

// // Replace body-parser with express.json()
// app.use(express.json()); // Parses JSON data in the request body
// //used for checking the request body

// app.use('/', userRoute);

// app.use((err, req, res, next) => {
//     console.error(err.stack);
//     res.status(500).json({
//         success: false,
//         message: err.message,
//     });
// });


// module.exports = app; // for testing 



const express = require('express');
const userRoute = require('./routers/user.route');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json()); // Parses application/json
app.use(express.json()); // Parses incoming JSON requests

app.use('/', userRoute);

module.exports = app;



