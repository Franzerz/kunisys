const express = require('express')
const colors = require('colors');
const morgan = require('morgan');
const dotenv = require('dotenv');
const { connect } = require('mongoose');
const connectDB = require('./config/db');

//dotenv config
dotenv.config();

//mongodb connection
connectDB();

//rest obj
const app = express();

//middlewares
app.use(express.json());
app.use(morgan('dev'));

//routes
app.use('/api/v1/user', require('./routes/userRoutes'));

//port
const PORT = process.env.PORT || 8080;
//listen port
app.listen(PORT, () => {
	console.log(`server is running in ${process.env.NODE_MODE} Mode on port ${process.env.PORT}`.yellow.bold);
});