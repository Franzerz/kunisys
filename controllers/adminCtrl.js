const doctorModel = require('../models/doctorModels');
const userModel = require('../models/userModels');

const usersController = async(req,res) => {
	try {
		const users = await userModel.find({})
		res.status(200).send({success: true, data: users, message: 'Users data fetched successfully'})
	} catch (error) {
		console.log(error)
		res.status(500).send({success: false, error, message: 'Error while fetching users data'})
	}
}

const doctorsController = async(req,res) => {
	try {
		const doctors = await doctorModel.find({})
		res.status(200).send({success: true, data: doctors, message: 'Doctors data fetched successfully'})
	} catch (error) {
		console.log(error)
		res.status(500).send({success: false, error, message: 'Error while fetching doctors data'})
	}
}

module.exports = { usersController, doctorsController }