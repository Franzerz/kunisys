const mongoose = require('mongoose');
const colors = require('colors');

const connectDB = async () => {
	try {
		await mongoose.connect(process.env.MONGODB_URL)
		console.log(`MongoDB Server is connected at ${mongoose.connection.host}`.green);
	} catch (error) {
		console.log('MongoDB Server is not connected'.red);
	}
}

module.exports = connectDB;