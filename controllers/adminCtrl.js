const doctorModel = require('../models/doctorModel');
const userModel = require('../models/userModel');

const usersController = async(req,res) => {
	try {
		const users = await userModel.find({})
		res.status(200).send({success: true, data: users, message: 'Users data fetched successfully'})
	} catch (error) {
		console.log(error)
		res.status(500).send({success: false, error, message: 'Error while fetching users data'})
	}
}

const doctorsController = async(res,req) => {
	try {
		const doctors = await doctorModel.find({})
		res.status(200).send({success: true, data: doctors, message: 'Doctors data fetched successfully'})
	} catch (error) {
		console.log(error)
		res.status(500).send({success: false, error, message: 'Error while fetching doctors data'})
	}
}

export { usersController, doctorsController }