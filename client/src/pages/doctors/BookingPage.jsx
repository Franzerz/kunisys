import React, {useEffect, useState} from 'react';
import axios from 'axios';
import {useParams} from 'react-router-dom';
import Layout from '../../components/Layout'
import { DatePicker, TimePicker } from 'antd';
import dayjs from 'dayjs';

const BookingPage = () => {
	const params = useParams();
	const [doctors, setDoctors] = useState([]);
	const [date, setDate] = useState();
	const [time, setTime] = useState();
	const [available, setAvailable] = useState();
	const getUserData = async () => {
		try {
			const res = await axios.post('/api/v1/doctor/getDoctorbyId', 
				{doctorId: params.doctorId}, {
				headers: {
					'Authorization': `Bearer ${localStorage.getItem('token')}`
				}
			})
			if(res.data.success){
				setDoctors(res.data.data)
			}
		} catch (error) {
			console.log(error);
		}
	}

	useEffect(() => {
		getUserData();
		//eslint-disable-next-line
	}, [])
  return (
	<Layout>
		<h3>Booking Page</h3>
		<div className="container m-2">
			{doctors && (
				<div>
					<h4>Dr.{doctors.firstName} {doctors.lastName}</h4>
					<h4>Specialization: {doctors.specialization}</h4>
					<h4>Available Timeslot: {doctors.time && doctors.time[0]} - {doctors.time && doctors.time[1]}</h4>
					<div className="d-flex flex-column w-50">
						<DatePicker className= "m-2" format="DD-MM-YYYY" onChange={(value) => setDate(dayjs(value).format('DD-MM-YYYY'))} />
						<TimePicker.RangePicker className= "m-2" format="HH:mm" onChange={(values) => setTime([
							dayjs(values[0]).format('HH:mm'),
							dayjs(values[1]).format('HH:mm')
						])}/>
						<button className='btn btn-primary mt-2'>Check Availability</button>
					</div>
				</div>
			)}
		</div>
	</Layout>
  )
}

export default BookingPage