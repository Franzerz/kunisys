const doctorModel = require('../models/doctorModels');
const userModel = require('../models/userModels');
const appointModel = require('../models/appointModel');

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
		const doctor = await doctorModel.findByIdAndUpdate(doctorId, {status: 'approved'}, {new: true});
		await userModel.findByIdAndUpdate(doctor.userId, { isDoctor: true });
		const user = await userModel.findOne({ _id: doctor.userId });
		user.notification.push({type: 'account-request-update', message: `Your account status has been approved`, onClickPath: '/notification'});
		await user.save();
		return res.status(200).send({ success: true, message: 'Doctor account approved successfully', data: doctor });
	  } else if (status === 'rejected') {
		const doctor = await doctorModel.findById(doctorId);
		if (!doctor) {
		  return res.status(404).send({ success: false, message: 'Doctor record not found' });
		}
		await userModel.findByIdAndUpdate(doctor.userId, { isDoctor: false });
		await doctorModel.findByIdAndDelete(doctorId);
		const user = await userModel.findOne({ _id: doctor.userId });
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

const deleteUserController = async (req, res) => {
	try {
		const { targetUserId } = req.body;
		if (req.user && req.user.id === targetUserId) {
			return res.status(400).send({ success: false, message: 'Cannot block yourself' });
		}
		const user = await userModel.findById(targetUserId);
		if (!user) {
			return res.status(404).send({ success: false, message: 'User not found' });
		}
		if (user.isDoctor) {
			await doctorModel.deleteOne({ userId: targetUserId });
		}
		await userModel.findByIdAndDelete(targetUserId);
		return res.status(200).send({success: true, message: 'User deleted successfully'});
	} catch (error) {
		console.log(error);
		return res.status(500).send({success: false, message: 'Error deleting user', error: error.message});
	}
  }

  const giveAdminController = async (req, res) => {
	try {
	  const { targetUserId } = req.body;
	  if (req.user && req.user.id === targetUserId) {
		return res.status(400).send({ success: false, message: 'Cannot promote yourself' });
	  }
	  const user = await userModel.findById(targetUserId);
	  if (!user) {
		return res.status(404).send({ success: false, message: 'User not found' });
	  }
	  user.isAdmin = true;
	  await user.save();
	  return res.status(200).send({ success: true, message: 'User has been promoted to admin' });
	} catch (error) {
	  console.log(error);
	  return res.status(500).send({ success: false, message: error.message });
	}
  }

  const getAllAppointmentsController = async (req, res) => {
	try {
	  const appointments = await appointModel.find({ status: 'approved' });
	  res.status(200).send({success: true, data: appointments, message: 'Appointments fetched successfully'});
	} catch (error) {
	  console.log(error);
	  res.status(500).send({success: false, error: error.message, message: 'Error while fetching appointments'});
	}
  }

module.exports = { 
	usersController, 
	doctorsController, 
	accountStatusController, 
	deleteUserController, 
	giveAdminController,
	getAllAppointmentsController,
}