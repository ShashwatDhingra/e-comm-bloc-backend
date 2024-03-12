const mongoose = require('mongoose');

const mongoPass = process.env.MONGO_PASS
console.log(mongoPass);
const DbName = 'E-Comm-Bloc-Flutter';

// MongoDB connection URI
const mongoURI = `mongodb+srv://flutter_dev:${mongoPass}@cluster0.lhobowv.mongodb.net/${DbName}`;

const dbConnection = mongoose.createConnection(mongoURI).on('open', () => {
    console.log('Connected to MongoDb Successfully');
}).on('error', () => {
    console.log('Error while connecting to MongoDb');
});

module.exports = dbConnection;