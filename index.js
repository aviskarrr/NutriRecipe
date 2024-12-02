const app = require('./app');
const PORT = process.env.PORT || 5000;
const DB = require('./config/database');
const UserModel = require('./model/user.model');

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.listen(PORT, ()=>{
    console.log(`Server is running on port ${PORT}`);
})

module.exports = app; // for testing