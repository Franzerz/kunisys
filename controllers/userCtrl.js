const userModel = require('../models/userModels');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const doctorModel = require('../models/doctorModels');
const appointModel = require('../models/appointModel');
const dayjs = require('dayjs');
const customParseFormat = require('dayjs/plugin/customParseFormat');
dayjs.extend(customParseFormat);

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
			name: newDoctor.firstName + " " + newDoctor.lastName,
			onClickPath: '/admin/doctors/'
		}})
		await userModel.findByIdAndUpdate(adminUser._id,{notification})
		res.status(201).send({success: true, message: "Application submitted successfully"})
	} catch(error){
		console.log(error)
		res.status(500).send({success: false, error, message: "Error while applying"})
	}
  }

  //notification ctrl
  const notifyController = async (req, res) => {
	try{
		const user = await userModel.findOne({_id:req.body.userId})
		const seenoti = user.seenoti
		const notification = user.notification
		seenoti.push(...notification)
		user.notification = []
		user.seenoti = notification
		const updateUser = await user.save()
		res.status(200).send({success: true, message:"All notifications marked as read", data: updateUser})
	} catch(error){
		console.log(error)
		res.status(500).send({success: false, error, message: "Error in notification"})
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
			onClickPath: '/doctor-appointment'
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
		const date = dayjs(req.body.date, "DD-MM-YYYY").toISOString();
		const fromTime = dayjs(req.body.time, "HH:mm").subtract(1, "hour").toISOString();
		const toTime = dayjs(req.body.time, "HH:mm").add(1, "hour").toISOString();
		const doctorId = req.body.doctorId;
		const appointments = await appointModel.find({doctorId, date, time:{
			$gte: fromTime,
			$lte: toTime
		}});
		if(appointments.length > 0){
			return res.status(200).send({success: true, message: "Doctor is not available at this time"})
		} else{
			return res.status(200).send({success: true, message: "Doctor is available at this time"})
		}
	} catch (error) {
		console.log(error)
		res.status(500).send({success: false, error, message: "Error while setting availability"})
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
};