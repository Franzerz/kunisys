import React, { useState, useEffect } from 'react'
import Layout from '../../components/Layout'
import dayjs from 'dayjs'
import { message, Table } from 'antd'
import axios from 'axios'

const DoctorAppointment = () => {
	const [appointment, setAppointment] = useState([])

	const getAppointment = async () => {
		try {
			const res = await axios.get('/api/v1/doctor/docAppointment', {
				headers: {
					Authorization: `Bearer ${localStorage.getItem('token')}`
				}
			})
			if(res.data.success){
				setAppointment(res.data.data)
			}
		} catch (error) {
			console.log(error)
		}
	}

	useEffect(() => {
		getAppointment()
	}, [])

	const handleStatus = async (record, status) => {
		try {
			const res = await axios.post('/api/v1/doctor/updateStatus', {appointmentId: record._id, status}, {
				headers:{
					Authorization: `Bearer ${localStorage.getItem('token')}`
				}
			})
			if(res.data.success){
				message.success(res.data.message)
				getAppointment()
			}
		} catch (error) {
			console.log(error)
			message.error('Error while updating status')
		}
	}

	const handleDeleteAppointment = async (appointmentId) => {
		try {
			const res = await axios.post('/api/v1/user/deleteAppointment', { appointmentId }, {
			headers: {
			  Authorization: `Bearer ${localStorage.getItem('token')}`
			}
		})
			if (res.data.success) {
				message.success(res.data.message)
				getAppointment()
			} else {
				message.error(res.data.message)
			}
		} catch (error) {
			console.log(error)
			message.error('Error deleting appointment')
		}
	  }

	const columns = [
			{
				title: 'ID',
				dataIndex: '_id',
			},
			{
				title: 'Doctor',
				dataIndex: 'name',
				render:(text,record) => (
					<span>
						{record.doctorInfo.firstName} {record.doctorInfo.lastName}
					</span>
				)
			},
			{
				title: 'Patient',
				dataIndex: 'patient',
				render:(text,record) => (
					<span>
						{record.userInfo.name}
					</span>
				)
			},
			{
				title: 'Date & Time',
				dataIndex: 'date',
				render:(text,record) => (
					<span>
						{dayjs(record.date).format('DD-MM-YYYY')} &nbsp;
						{dayjs(record.time).format('HH:mm')}
					</span>
				)
			},
			{
				title: 'Status',
				dataIndex: 'status',
			},
			{
				title: 'Action',
				dataIndex: 'action',
				render:(text,record) => (
					<div className="d-flex">
						{record.status === "pending" ? (
							<div classname="d-flex">
								<button className="btn btn-success" onClick={() => handleStatus(record, 'approved')}>Approve</button>
								<button className="btn btn-danger ms-2" onClick={() => handleStatus(record, 'rejected')}>Reject</button>
							</div>
						) : (
							<button className="btn btn-danger" onClick={() => handleDeleteAppointment(record._id)}>Delete</button>
						)}
					</div>
				)
			}
		]

  return (
	<Layout>
		<h1>Appointment Lists</h1>
		<Table columns={columns} dataSource={appointment} />
	</Layout>
  )
}

export default DoctorAppointment