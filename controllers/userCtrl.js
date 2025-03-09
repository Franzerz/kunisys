const userModel = require('../models/userModels');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const doctorModel = require('../models/doctorModels');
const appointModel = require('../models/appointModel');
const dayjs = require('dayjs');
const customParseFormat = require('dayjs/plugin/customParseFormat');
dayjs.extend(customParseFormat);
const nodemailer = require('nodemailer');
const dotenv = require('dotenv');
dotenv.config();

//register callback
const registerController = async (req,res) => {
	try {
		const existingUser = await userModel.findOne({email:req.body.email});
		if (existingUser) {
			return res.status(200).send({message: 'User already exists', success: false});
		}
		const password = req.body.password;
		const salt = await bcrypt.genSalt(10);
		const hashedPassword = await bcrypt.hash(password, salt);
		req.body.password = hashedPassword;
		const newUser = new userModel(req.body);
		await newUser.save();
		res.status(201).send({message: 'User registered successfully', success: true});
	} catch (error) {
		console.log(error);
		res.status(500).send({success: false, message: `Register Controller ${error.message}`});
	}
};

//login callback
const loginController = async (req,res) => {
	try {
		const user = await userModel.findOne({email:req.body.email});
		if (!user) {
			return res.status(200).send({message: 'User not found', success: false});
		}
		const isMatch = await bcrypt.compare(req.body.password, user.password);
		if(!isMatch) {
			return res.status(200).send({message: 'Invalid Email or Password', success: false});
		}
		const token = jwt.sign({id: user._id}, process.env.JWT_SECRET, {expiresIn: '1d'}); //change token time here
		res.status(200).send({message: 'Login Successful', success: true, token });
	} catch (error) {
		console.log(error);
		res.status(500).send({message: `Error in Login CTRL ${error.message}`});
	}
};

//auth callback
const authController = async (req, res) => {
	try {
	  const user = await userModel.findById({ _id: req.body.userId });
	  user.password = undefined;
	  if (!user) {return res.status(200).send({ message: "user not found", success: false,});
	  } else {
		res.status(200).send({success: true,data: user,});
	  }
	} catch (error) {
	  console.log(error);
	  res.status(500).send({message: "auth error",success: false,error,});
	}
  };

//recruit ctrl
  const recruitController = async (req, res) => {
	try{
		const newDoctor = await doctorModel({...req.body, status: 'pending'})
		await newDoctor.save()
		const adminUser = await userModel.findOne({isAdmin:true})
		const notification = adminUser.notification
		notification.push({
			type:'apply-request', 
			message: `${newDoctor.firstName} ${newDoctor.lastName} has applied for the doctor position`,
			data:{
				doctorId: newDoctor._id,
				name: newDoctor.firstName + " " + newDoctor.lastName},
			onClickPath: '/admin/doctors'
	})
		await userModel.findByIdAndUpdate(adminUser._id,{notification})
		res.status(201).send({success: true, message: "Application submitted successfully"})
	} catch(error){
		console.log(error)
		res.status(500).send({success: false, error, message: "Error while applying"})
	}
  }

  //notification ctrl
  const notifyController = async (req, res) => {
	try {
	  const user = await userModel.findOne({ _id: req.body.userId });
	  user.seenoti = [...user.seenoti, ...user.notification];
	  user.notification = [];
	  const updateUser = await user.save();
	  res.status(200).send({success: true, message: "All notifications marked as read", data: updateUser.toObject(),});
	} catch (error) {
	  console.log(error);
	  res.status(500).send({ success: false, error, message: "Error in notification" });
	}
  }

  const delnotiController = async (req, res) => {
	try {
		const user = await userModel.findOne({_id:req.body.userId})
		user.notification = []
		user.seenoti = []
		const updateUser = await user.save()
		updateUser.password = undefined
		res.status(200).send({success: true, message: "All notifications deleted successfully", data: updateUser})
	} catch (error) {
		console.log(error)
		res.status(500).send({success: false, error, message: "Unable to delete all notifications"})
	}
  }

  const getAllDocController = async (req, res) => {
	try {
		const doctors = await doctorModel.find({status: "approved"})
		res.status(200).send({success: true, data: doctors, message: "Doctors list fetched successfully"})
	} catch (error) {
		console.log(error)
		res.status(500).send({success: false, error, message: "Error while fetching all doctors"})
	}
  }

  const appointmentController = async (req, res) => {
	try {
		const fullDateTime = `${req.body.date} ${req.body.time}`;
		const dateTime = dayjs(fullDateTime, 'DD-MM-YYYY HH:mm');
		req.body.date = dateTime.toISOString();
		req.body.time = dateTime.toISOString();
		req.body.status = 'pending'
		const newAppointment = new appointModel(req.body)
		await newAppointment.save()
		const user = await userModel.findOne({_id: req.body.doctorInfo.userId})
		user.notification.push({
			type: 'new-appointment-request',
			message: `A new appointment request from ${req.body.userInfo.name}`,
			onClickPath: '/doctor/appointment'
		})
		await user.save()
		res.status(200).send({success: true, message: "Appointment booked successfully"})
	} catch (error) {
		console.log(error)
		res.status(500).send({success: false, error, message: "Error while booking appointment"})
	}
  }

	const availabilityController = async (req, res) => {
		try {
		const fullDateTime = dayjs(`${req.body.date} ${req.body.time}`, 'DD-MM-YYYY HH:mm');
		const fromTime = fullDateTime.subtract(15, 'minutes').toISOString();
		const toTime = fullDateTime.add(15, 'minutes').toISOString();
		const appointments = await appointModel.find({
			doctorId: req.body.doctorId,
			time: { $gte: fromTime, $lte: toTime }
		});
		if (appointments.length > 0) {
			return res.status(200).send({ success: false, message: "Doctor is not available at this time" });
		} else {
			return res.status(200).send({ success: true, message: "Doctor is available at this time" });
		}
		} catch (error) {
		console.log(error);
		res.status(500).send({ success: false, error, message: "Error while checking availability" });
		}
	}

  const userAppointmentController = async (req, res) => {
	try {
		const appointments = await appointModel.find({userId: req.body.userId})
		res.status(200).send({success: true, data: appointments, message: "User appointments fetched successfully"})
	} catch (error) {
		console.log(error)
		res.status(500).send({success: false, error, message: "Error while fetching user appointments"})
	}
  }

  const updateProfileController = async (req, res) => {
	try {
	  const { userId, name, email } = req.body;
	  const updatedUser = await userModel.findByIdAndUpdate(
		userId,
		{ name, email },
		{ new: true }
	  )
	  updatedUser.password = undefined;
	  res.status(200).send({success: true, message: 'Profile updated successfully', data: updatedUser,})
	} catch (error) {
	  console.log(error);
	  res.status(500).send({success: false, message: 'Error updating profile', error: error.message,})
	}
  }

  const changePasswordController = async (req, res) => {
	try {
	  const { userId, currentPassword, newPassword } = req.body;
	  const user = await userModel.findById(userId);
	  if (!user) {
		return res.status(404).send({ success: false, message: 'User not found' });
	  }
	  const isMatch = await bcrypt.compare(currentPassword, user.password);
	  if (!isMatch) {
		return res.status(400).send({ success: false, message: 'Current password is incorrect' });
	  }
	  const salt = await bcrypt.genSalt(10);
	  const hashedNewPassword = await bcrypt.hash(newPassword, salt);
	  user.password = hashedNewPassword;
	  await user.save();
	  res.status(200).send({ success: true, message: 'Password changed successfully' });
	} catch (error) {
	  console.log(error);
	  res.status(500).send({ success: false, message: error.message });
	}
  }

  const forgotPasswordController = async (req, res) => {
	try {
	  const { email } = req.body;
	  const user = await userModel.findOne({ email });
	  if (!user) {
		return res.status(404).send({ success: false, message: 'User with this email does not exist' });
	  }
	  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '15m' });
	  const resetLink = `http://localhost:3000/reset-password/${token}`;
	  const transporter = nodemailer.createTransport({
		service: 'gmail',
		auth: {
		  user: process.env.GMAIL_USER,
		  pass: process.env.GMAIL_PASS,
		},
	  });

	  const mailOptions = {
		from: process.env.GMAIL_USER,
		to: email,
		subject: 'Password Reset',
		text: `You requested a password reset. Please click the link below to reset your password:\n\n${resetLink}\n\nThis link expires in 15 minutes.`,
	  };

	  transporter.sendMail(mailOptions, (error, info) => {
		if (error) {
		  console.log(error);
		  return res.status(500).send({ success: false, message: 'Error sending email' });
		} else {
		  return res.status(200).send({ success: true, message: 'Password reset link sent to your email' });
		}
	  });
	} catch (error) {
	  console.log(error);
	  res.status(500).send({ success: false, message: error.message });
	}
  }

  const resetPasswordController = async (req, res) => {
	try {
	  const { token, newPassword } = req.body;
	  if (!token) {
		return res.status(400).send({ success: false, message: 'Token is required' });
	  }
	  let decoded;
	  try {
		decoded = jwt.verify(token, process.env.JWT_SECRET);
	  } catch (error) {
		return res.status(400).send({ success: false, message: 'Invalid or expired token' });
	  }
	  const user = await userModel.findById(decoded.id);
	  if (!user) {
		return res.status(404).send({ success: false, message: 'User not found' });
	  }
	  const salt = await bcrypt.genSalt(10);
	  const hashedPassword = await bcrypt.hash(newPassword, salt);
	  user.password = hashedPassword;
	  await user.save();
  
	  res.status(200).send({ success: true, message: 'Password reset successful' });
	} catch (error) {
	  console.log(error);
	  res.status(500).send({ success: false, message: error.message });
	}
  }

  const deleteAppointmentController = async (req, res) => {
	try {
	  const { appointmentId } = req.body;
	  await appointModel.findByIdAndDelete(appointmentId);
	  res.status(200).send({ success: true, message: "Appointment deleted successfully" });
	} catch (error) {
	  console.log(error);
	  res.status(500).send({ success: false, message: "Error deleting appointment", error: error.message });
	}
  }

module.exports = {
	loginController, 
	registerController, 
	authController, 
	recruitController, 
	notifyController, 
	delnotiController, 
	getAllDocController,
	appointmentController,
	availabilityController,
	userAppointmentController,
	updateProfileController,
	changePasswordController,
	forgotPasswordController,
	resetPasswordController,
	deleteAppointmentController
};