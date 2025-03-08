import React, { useEffect, useState } from 'react';
import { Tabs, Calendar, Row } from 'antd';
import axios from 'axios';
import DoctorList from '../components/DoctorList';
import Layout from '../components/Layout';
import dayjs from 'dayjs';
const { TabPane } = Tabs;

const HomePage = () => {

	const [doctors, setDoctors] = useState([]);
	const [appointments, setAppointments] = useState([]);
	
	const fetchDoctors = async () => {
		try {
			const res = await axios.get('/api/v1/user/getAllDoctors', {
			headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
		});
		if (res.data.success) {
			setDoctors(res.data.data);
		}
		} catch (error) {
			console.error(error);
		}
	}
  
	const fetchAppointments = async () => {
		try {
			const res = await axios.get('/api/v1/user/userAppointment', {
		  	headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
		});
		if (res.data.success) {
			const approved = res.data.data.filter(app => app.status === 'approved');
			setAppointments(approved);
		}
		} catch (error) {
			console.error(error);
		}
	}
  
	useEffect(() => {
		fetchDoctors();
		fetchAppointments();
	}, []);
  
	const appointmentsByDate = appointments.reduce((acc, app) => {
		const key = dayjs(app.date).format('YYYY-MM-DD');
		if (!acc[key]) {
			acc[key] = [];
		}
		acc[key].push(app);
		return acc;
	}, {});

	const cellRender = (current) => {
		const key = current.format('YYYY-MM-DD');
		const dayApps = appointmentsByDate[key] || [];
		return (
		<div>
			{dayApps.map((app, index) => (
			<div
				key={index}
				style={{
					background: '#bae7ff',
					marginBottom: 2,
					padding: '2px 4px',
					borderRadius: 2,
					fontSize: 12,
				}}>
				Dr. {app.doctorInfo.firstName} {app.doctorInfo.lastName} @ {dayjs(app.date).format('HH:mm')}
			</div>
		  ))}
		</div>
	  );
	}
  
	return (
		<Layout>
		<Tabs defaultActiveKey="1">
			<TabPane tab="Doctors" key="1">
			<Row>
				{doctors && doctors.map((doctor) => <DoctorList doctor={doctor} />)}
			</Row>
			</TabPane>
			<TabPane tab="My Bookings" key="2">
				<h2>My Bookings Calendar</h2>
				<Calendar cellRender={cellRender} />
			</TabPane>
		</Tabs>
		</Layout>
	);
}
	  
export default HomePage;