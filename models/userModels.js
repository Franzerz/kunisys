const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
	name: {
	type:String,
	required:[true, 'name is required']
	},
	lastname: {
		type: String,
		required: false,
	},
	email: {
	type:String,
	required:[true, 'email is required'],
	unique: true,
	},
	phone: {
		type: String,
		required: false,
    },
	address: {
		type: String,
		required: false,
	},
	password: {
	type:String,
	required:[true, 'password is required']
	},
	isAdmin: {
		type:Boolean,
		default:false
	},
	isDoctor: {
		type:Boolean,
		default:false
	},
	notification: {
		type:Array,
		default:[]
	},
	seenoti: {
		type:Array,
		default:[]
	},
});

const userModel = mongoose.model('users', userSchema);

module.exports = userModel;