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

const accountStatusController = async(req,res) => {
	try {
		const {doctorId, status} = req.body
		const doctor = await doctorModel.findByIdAndUpdate(doctorId, {status})
		const user = await userModel.findOne({_id:doctor.userId})
		const notification = user.notification
		notification.push({type:'account-request-update', message:`Your account status has been ${status}`, onClickPath:'/notification'})
		user.isDoctor = status === 'approved' ? true : false
		await user.save()
		res.status(201).send({success: true, message: `Account status updated`, data: doctor})
	} catch (error) {
		console.log(error)
		res.status(500).send({success: false, error, message: 'Error while updating account status'})
	}
}

module.exports = { usersController, doctorsController, accountStatusController }