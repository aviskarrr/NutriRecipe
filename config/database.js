const mongoose = require('mongoose');

const connection = mongoose.createConnection('mongodb://127.0.0.1:27017/userinfo').on('open', () => {
    console.log('Database connected');
}).on('error', () => {
    console.log('Connection error');
});

module.exports = connection; // for testing