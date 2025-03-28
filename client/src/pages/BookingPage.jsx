import React, {useEffect, useState} from 'react';
import axios from 'axios';
import {useParams} from 'react-router-dom';
import Layout from '../components/Layout'
import { DatePicker, message, TimePicker } from 'antd';
import dayjs from 'dayjs';
import { useDispatch, useSelector } from 'react-redux';
import {showLoading, hideLoading} from '../redux/features/alertSlice'


const BookingPage = () => {
	const {user} = useSelector(state => state.user)
	const params = useParams();
	const [doctor, setDoctor] = useState([]);
	const [date, setDate] = useState();
	const [time, setTime] = useState();
	const [available, setAvailable] = useState();
	const dispatch = useDispatch();
	const getUserData = async () => {
		try {
			const res = await axios.post('/api/v1/doctor/getDoctorbyId', 
				{doctorId: params.doctorId}, {
				headers: {
					'Authorization': `Bearer ${localStorage.getItem('token')}`
				}
			})
			if(res.data.success){
				setDoctor(res.data.data)
			}
		} catch (error) {
			console.log(error);
		}
	}

	const handleAvailability = async () => {
		try {
			if (!date || !time) {
				return message.error("Please select both date and time");
			}
			if (!available) {}
			dispatch(showLoading());
			const res = await axios.post('/api/v1/user/availability', {
				doctorId: params.doctorId,
				date,
				time
			}, { headers: {
			  'Authorization': `Bearer ${localStorage.getItem('token')}`
			}
		});
			dispatch(hideLoading());
			if (res.data.success) {
				setAvailable(true);
				message.success(res.data.message);
			} else {
				setAvailable(false);
				message.error(res.data.message);
			}
		} catch (error) {
			dispatch(hideLoading());
			console.log(error);
		}
	  }
	
	const handleBooking = async () => {
		if (!date || !time) {
			return alert("Date & Time Required");
		}
		try {
			dispatch(showLoading());
			const availRes = await axios.post('/api/v1/user/availability',
			{ doctorId: params.doctorId, date, time },
			{ headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` } }
			);
			dispatch(hideLoading());
			if (!availRes.data.success) {
				return alert("Selected timeslot is not availables. Please check availabilty first.");
			}
			dispatch(showLoading());
			const res = await axios.post('/api/v1/user/appointment',
			{
				doctorId: params.doctorId,
				userId: user._id,
				doctorInfo: doctor,
				userInfo: user,
				date: date,
				time: time
			},
			{ headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` } }
			);
			dispatch(hideLoading());
			if (res.data.success) {
				message.success(res.data.message);
			}
		} catch (error) {
			dispatch(hideLoading());
			console.log(error);
		}
	  }

	useEffect(() => {
		getUserData();
		//eslint-disable-next-line
	}, [])
  return (
	<Layout>
	<div className="ListofDoctors-button">Booking Page</div>
		<div className="doccard">
			{doctor && (
				<>
					<div className="doccard-header">
						Dr. {doctor.firstName} {doctor.lastName}
					</div>
					<div className="doccard-body">
						<p><b>Specialization:</b> {doctor.specialization}</p>
						<p><b>Phone:</b> {doctor.phone}</p>
						<p><b>Email:</b> {doctor.email}</p>
						<p><b>Available Timeslot:</b> {doctor.time ? `${doctor.time[0]} - ${doctor.time[1]}` : 'No timeslot available'}</p>
						<DatePicker
							className="form-control my-2"
							format="DD-MM-YYYY"
							onChange={(value) => setDate(dayjs(value).format('DD-MM-YYYY'))}
						/>
						<TimePicker
							className="form-control my-2"
							format="HH:mm"
							onChange={(value) => setTime(dayjs(value).format('HH:mm'))}
						/>
						<button className="btn btn-primary w-100 mt-2" onClick={handleAvailability}>
							Check Availability
						</button>
						<button className="btn btn-dark w-100 mt-2" onClick={handleBooking}>
							Book Now
						</button>
					</div>
				</>
			)}
		</div>
</Layout>
  )
}

export default BookingPage