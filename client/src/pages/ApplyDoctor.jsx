import React from 'react'
import Layout from '../components/Layout'
import { Col, Form, Input, Row, TimePicker } from 'antd'

const ApplyDoctor = () => {
	const handleFinish = (values) => {
		console.log(values)

	}
  return (
	<Layout>
		<h1 className="text-center">Apply Doctor</h1>
		<Form layout="vertical" onFinish={handleFinish} className="m-3">
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
						<Input type="text" placeholder="50000.-/Month"/>
					</Form.Item>
				</Col>
				<Col xs={24} md={24} lg={8}>
					<Form.Item label="Salary (Month)" name="salary" required rules={[{required: true}]}>
						<Input type="text" placeholder="50000"/>
					</Form.Item>
				</Col>
				<Col xs={24} md={24} lg={8}>
					<Form.Item label="Available Timeslot" name="time" required rules={[{required: true}]}>
						<TimePicker.RangePicker/>
					</Form.Item>
				</Col>
			</Row>
			<div className="d-flex justify-content-end">
				<button type="submit" className="btn btn-primary">Submit</button>
			</div>
		</Form>
	</Layout>
  )
}

export default ApplyDoctor