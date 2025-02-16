const mongoose = require('mongoose')

const doctorSchema = new mongoose.Schema({
	userId:{
		type: String,
	},
	firstName:{
		type: String,
		required: [true, 'First name is required']
	},
	lastName:{
		type: String,
		required: [true, 'Last name is required']
	},
	phone:{
		type: String,
		required: [true, 'Phone number is required']
	},
	email:{
		type: String,
		required: [true, 'Email is required']
	},
	address:{
		type: String,
		required: [true, 'Address is required']
	},
	license:{
		type: String,
		required: [true, 'License is required']
	},
	specialization:{
		type: String,
		required: [true, 'Specialization is required']
	},
	experience:{
		type: String,
		required: [true, 'Experience is required']
	},
	time:{
		type: String,
		required: [true, 'Work time is required']
	},
	salary:{
		type: String,
		required: [true, 'Salary is required']
	},
},{timestamps:true})

const doctorModel = mongoose.model('users', doctorSchema)
module.exports = doctorModel