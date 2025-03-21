import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Layout from '../components/Layout'
import dayjs from 'dayjs'
import { Table, message } from 'antd'

const Appointment = () => {
	const [appointment, setAppointment] = useState([])

	const getAppointment = async () => {
		try {
			const res = await axios.get('/api/v1/user/userAppointment', {
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

	const handleDeleteAppointment = async (appointmentId) => {
		try {
		  const res = await axios.post('/api/v1/user/deleteAppointment', {appointmentId},
			{
			  headers: {
				Authorization: `Bearer ${localStorage.getItem('token')}`
			  }
			}
		  )
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
			title: 'Actions',
			dataIndex: 'actions',
			render: (text, record) => (
			  <button 
				className="btn btn-danger" 
				onClick={() => handleDeleteAppointment(record._id)}>
				  Delete
			  </button>
			)
		  }
	]

  return (
	<Layout>
		<div className="ListofDoctors-button">Appointment Lists</div>
		<Table columns={columns} dataSource={appointment} />
	</Layout>
  )
}

export default Appointment