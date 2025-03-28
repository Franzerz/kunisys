import React from 'react'
import Layout from '../components/Layout'
import { Col, Form, Input, message, Row, TimePicker } from 'antd'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { showLoading,hideLoading } from '../redux/features/alertSlice'
import axios from 'axios'

const ApplyDoctor = () => {
	const {user} = useSelector(state => state.user)
	const dispatch = useDispatch()
	const navigate = useNavigate()
	const handleFinish = async (values) => {
		try{
			dispatch(showLoading())
			const res = await axios.post('/api/v1/user/recruit', 
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
  return (
	<Layout>
		<div className="ListofDoctors-button">Doctor Recruitment</div>
		<Form layout="vertical" onFinish={handleFinish} className="m-3">
		<div className="custom-calendar-container">
		<div className="PersonalDetail-button">Personal Details :</div>
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
			<div className="PersonalDetail-button">Professional Details :</div>
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
			</div>
		</Form>
	</Layout>
  )
}

export default ApplyDoctor