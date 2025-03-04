const doctorModel = require('../models/doctorModels');

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

module.exports = { docInfoController, updateController }