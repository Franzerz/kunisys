import React from 'react'
import { useNavigate } from 'react-router-dom'
import '../styles/Calendar.css';

const DoctorList = ({doctor}) => {
	const navigate = useNavigate()
  return (
	<div>
		<div className="card" onClick={() => navigate(`/doctor/appointment/${doctor._id}`)}>
			<div className="card-header">
				Dr. {doctor.firstName} {doctor.lastName}
			</div>
			<div className="card-body">
				<p><b>Specialization:</b> {doctor.specialization}</p>
				<p><b>phone:</b> {doctor.phone}</p>
				<p><b>email:</b> {doctor.email}</p>
				<p><b>Available Timeslot:</b> {doctor.time[0]} - {doctor.time[1]}</p>
			</div>
		</div>
	</div>
  )
}

export default DoctorList