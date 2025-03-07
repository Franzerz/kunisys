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

const accountStatusController = async (req, res) => {
	try {
	  const { doctorId, status } = req.body;
	  if (status === 'approved') {
		const doctor = await require('../models/doctorModels').findByIdAndUpdate(doctorId, {status: 'approved'}, {new: true});
		await require('../models/userModels').findByIdAndUpdate(doctor.userId, { isDoctor: true });
		const user = await require('../models/userModels').findOne({ _id: doctor.userId });
		user.notification.push({type: 'account-request-update', message: `Your account status has been approved`, onClickPath: '/notification'});
		await user.save();
		return res.status(200).send({ success: true, message: 'Doctor account approved successfully', data: doctor });
	  } else if (status === 'rejected') {
		const doctor = await require('../models/doctorModels').findById(doctorId);
		if (!doctor) {
		  return res.status(404).send({ success: false, message: 'Doctor record not found' });
		}
		await require('../models/userModels').findByIdAndUpdate(doctor.userId, { isDoctor: false });
		await require('../models/doctorModels').findByIdAndDelete(doctorId);
		const user = await require('../models/userModels').findOne({ _id: doctor.userId });
		user.notification.push({
		  type: 'account-request-update',
		  message: `Your doctor recruitment request has been rejected`,
		  onClickPath: '/notification'
		});
		await user.save();
		return res.status(200).send({ success: true, message: 'Doctor recruitment rejected and record deleted' });
	  } else {
		return res.status(400).send({ success: false, message: 'Invalid status provided' });
	  }
	} catch (error) {
	  console.log(error);
	  return res.status(500).send({ success: false, error: error.message, message: 'Error while updating account status' });
	}
  }

module.exports = { usersController, doctorsController, accountStatusController }