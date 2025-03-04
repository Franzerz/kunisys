import React, { useEffect, useState } from 'react'
import Layout from '../../components/Layout'
import { useSelector,useDispatch } from 'react-redux'
import axios from 'axios'
import { useParams, useNavigate } from 'react-router-dom'
import { Col, Form, Input, message, Row, TimePicker } from 'antd'
import { showLoading,hideLoading } from '../../redux/features/alertSlice'
import dayjs from 'dayjs'

const Profile = () => {
	const {user} = useSelector(state => state.user)
	const [doctor, setDoctor] = useState(null)
	const dispatch = useDispatch()
	const navigate = useNavigate()
	const params = useParams()

	const handleFinish = async (values) => {
		try{
			dispatch(showLoading())
			const res = await axios.post('/api/v1/doctor/updateProfile', 
				{...values, userId:user._id, 
				time:[
					values.time[0].format('HH:mm'),
					values.time[1].format('HH:mm'),
				]}, {
				headers:{
					Authorization: `Bearer ${localStorage.getItem('token')}`
				}
			})
			dispatch(hideLoading())
			if(res.data.success){
				message.success(res.data.message)
				navigate('/')
			}
			else{
				message.error(res.data.message)
			}
		} catch (error) {
			dispatch(hideLoading())
			console.log(error)
			message.error("Something went wrong")
		}
	}

	const getDoctorInfo = async() => {
		try {
			const res = await axios.post('/api/v1/doctor/getDocInfo', {userId: params.id}, {
				headers: {
					Authorization: `Bearer ${localStorage.getItem('token')}`
				}
			})
			if(res.data.success){
				setDoctor(res.data.data)
			}
		} catch (error) {
			console.log(error)
		}
	}

	useEffect(() => {
		getDoctorInfo()
		//eslint-disable-next-line
	}, [])
  return (
	<Layout>
		<h1>Manage Profile</h1>
		{doctor && (
			<Form layout="vertical" onFinish={handleFinish} className="m-3" initialValues={{
				...doctor,
				time:[
					dayjs(doctor.time[0], 'HH:mm'),
              		dayjs(doctor.time[1], 'HH:mm'),
				]
			}}>
			<h4 className="">Personal Details :</h4>
				<Row gutter={20}>
					<Col xs={24} md={24} lg={8}>
						<Form.Item label="First Name" name="firstName" required rules={[{required: true}]}>
							<Input type="text" placeholder="John"/>
						</Form.Item>
					</Col>
					<Col xs={24} md={24} lg={8}>
						<Form.Item label="Last Name" name="lastName" required rules={[{required: true}]}>
							<Input type="text" placeholder="Doe"/>
						</Form.Item>
					</Col>
					<Col xs={24} md={24} lg={8}>
						<Form.Item label="Phone Number" name="phone" required rules={[{required: true}]}>
							<Input type="text" placeholder="0923876969"/>
						</Form.Item>
					</Col>
					<Col xs={24} md={24} lg={8}>
						<Form.Item label="Email" name="email" required rules={[{required: true}]}>
							<Input type="text" placeholder="john.doe@gmail.com"/>
						</Form.Item>
					</Col>
					<Col xs={24} md={24} lg={8}>
						<Form.Item label="Address" name="address" required rules={[{required: true}]}>
							<Input type="text" placeholder="221B Baker Street, London"/>
						</Form.Item>
					</Col>
				</Row>
			<h4 className="">Professional Details :</h4>
				<Row gutter={20}>
					<Col xs={24} md={24} lg={8}>
						<Form.Item label="Specialization" name="specialization" required rules={[{required: true}]}>
							<Input type="text" placeholder="Family Medicine"/>
						</Form.Item>
					</Col>
					<Col xs={24} md={24} lg={8}>
						<Form.Item label="Experience" name="experience" required rules={[{required: true}]}>
							<Input type="text" placeholder="Princeton-Plainsboro Teaching Hospital"/>
						</Form.Item>
					</Col>
					<Col xs={24} md={24} lg={8}>
						<Form.Item label="Medical License" name="license" required rules={[{required: true}]}>
							<Input type="text" placeholder="1234"/>
						</Form.Item>
					</Col>
					<Col xs={24} md={24} lg={8}>
						<Form.Item label="Salary (Month)" name="salary" required rules={[{required: true}]}>
							<Input type="text" placeholder="50000"/>
						</Form.Item>
					</Col>
					<Col xs={24} md={24} lg={8}>
						<Form.Item label="Available Timeslot" name="time" required>
							<TimePicker.RangePicker format="HH:mm"/>
						</Form.Item>
					</Col>
					<Col xs={24} md={24} lg={8}>
					<button type="submit" className="btn btn-primary form-btn">Submit</button>
					</Col>
				</Row>
			</Form>
		)}
	</Layout>
  )
}

export default Profile