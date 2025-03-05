const doctorModel = require('../models/doctorModels');
const appointModel = require('../models/appointModel');
const userModel = require('../models/userModels');

const docInfoController = async (req, res) => {
	try {
		const doctor = await doctorModel.findOne({userId: req.body.userId})
		res.status(200).send({success: true, data: doctor, message: 'Doctor details fetched successfully'})
	} catch (error) {
		console.log(error)
		res.status(500).send({success: false, error, message: 'Error while fetching doctor details'})
	}
}

const updateController = async (req, res) => {
	try {
		const doctor = await doctorModel.findOneAndUpdate({userId: req.body.userId}, req.body)
		res.status(201).send({success: true, data: doctor, message: 'Doctor details updated successfully'})
	} catch (error) {
		console.log(error)
		res.status(500).send({success: false, error, message: 'Error while updating doctor details'})
	}
}

const docByIdController = async (req, res) => {
	try {
		const doctor = await doctorModel.findOne({_id:req.body.doctorId})
		res.status(200).send({success: true, data: doctor, message: 'Doctor info fetched successfully'})
	} catch (error) {
		console.log(error)
		res.status(500).send({success: false, error, message: 'Error while fetching doctor info'})
	}
}

const docAppointmentController = async (req, res) => {
	try {
		const doctor = await doctorModel.findOne({userId: req.body.userId})
		const appointments = await appointModel.find({doctorId: doctor._id})
		res.status(200).send({success: true, data: appointments, message: 'Appointments fetched successfully'})
	} catch (error) {
		console.log(error)
		res.status(500).send({success: false, error, message: 'Error while fetching appointments'})
	}
}

const updateStatsController = async (req, res) => {
	try {
		const {appointmentId, status} = req.body
		const appointment = await appointModel.findByIdAndUpdate(appointmentId, {status})
		const user = await userModel.findOne({_id: appointment.userId})
		const notification = user.notification
		notification.push({
			type: 'status-updated',
			message: `Your appointment has been updated to ${status}`,
			onClickPath: '/appointment'
		})
		await user.save()
		res.status(200).send({success: true, data: appointment, message: 'Appointment status updated successfully'})
	} catch (error) {
		console.log(error)
		res.status(500).send({success: false, error, message: 'Error while updating stats'})
	}
}

module.exports = { docInfoController, updateController, docByIdController, docAppointmentController, updateStatsController }