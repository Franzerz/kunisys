import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Layout from '../components/Layout'
import dayjs from 'dayjs'
import { Table } from 'antd'

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
	]

  return (
	<Layout>
		<h1>Appointment Lists</h1>
		<Table columns={columns} dataSource={appointment} />
	</Layout>
  )
}

export default Appointment