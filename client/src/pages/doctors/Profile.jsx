import React, { useEffect, useState } from 'react'
import Layout from '../../components/Layout'
import { useSelector,useDispatch } from 'react-redux'
import axios from 'axios'
import { useParams, useNavigate } from 'react-router-dom'
import { Col, Form, Input, message, Row, TimePicker, Tabs } from 'antd'
import { showLoading,hideLoading } from '../../redux/features/alertSlice'
import dayjs from 'dayjs'

const Profile = () => {
	const {user} = useSelector(state => state.user)
	const [doctor, setDoctor] = useState(null)
	const dispatch = useDispatch()
	const navigate = useNavigate()
	const params = useParams()

	const handleProfileFinish = async (values) => {
		try {
		  dispatch(showLoading())
		  const res = await axios.post(
			'/api/v1/doctor/updateProfile',
			{
			  ...values,
			  userId: user._id,
			  time: [
				values.time[0].format('HH:mm'),
				values.time[1].format('HH:mm'),
			  ],
			},
			{
			  headers: {
				Authorization: `Bearer ${localStorage.getItem('token')}`,
			  },
			}
		  )
		  dispatch(hideLoading())
		  if (res.data.success) {
			message.success(res.data.message)
			navigate('/')
		  } else {
			message.error(res.data.message)
		  }
		} catch (error) {
		  dispatch(hideLoading())
		  console.log(error)
		  message.error("Something went wrong")
		}
	  }

	  const handlePasswordFinish = async (values) => {
		try {
		  dispatch(showLoading())
		  const res = await axios.post(
			'/api/v1/user/changePassword',
			{ userId: user._id, ...values },
			{
			  headers: {
				Authorization: `Bearer ${localStorage.getItem('token')}`,
			  },
			}
		  )
		  dispatch(hideLoading())
		  if (res.data.success) {
			message.success(res.data.message)
		  } else {
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
      <Tabs defaultActiveKey="1">
        <Tabs.TabPane tab="Profile" key="1">
          {doctor && (
            <Form
              layout="vertical"
              onFinish={handleProfileFinish}
              className="m-3"
              initialValues={{
                ...doctor,
                time: [
                  dayjs(doctor.time[0], 'HH:mm'),
                  dayjs(doctor.time[1], 'HH:mm'),
                ],
              }}
            >
              <h4>Personal Details :</h4>
              <Row gutter={20}>
                <Col xs={24} md={24} lg={8}>
                  <Form.Item
                    label="First Name"
                    name="firstName"
                    rules={[{ required: true, message: 'First Name is required' }]}
                  >
                    <Input type="text" placeholder="John" />
                  </Form.Item>
                </Col>
                <Col xs={24} md={24} lg={8}>
                  <Form.Item
                    label="Last Name"
                    name="lastName"
                    rules={[{ required: true, message: 'Last Name is required' }]}
                  >
                    <Input type="text" placeholder="Doe" />
                  </Form.Item>
                </Col>
                <Col xs={24} md={24} lg={8}>
                  <Form.Item
                    label="Phone Number"
                    name="phone"
                    rules={[{ required: true, message: 'Phone Number is required' }]}
                  >
                    <Input type="text" placeholder="0923876969" />
                  </Form.Item>
                </Col>
                <Col xs={24} md={24} lg={8}>
                  <Form.Item
                    label="Email"
                    name="email"
                    rules={[{ required: true, message: 'Email is required' }]}
                  >
                    <Input type="text" placeholder="john.doe@gmail.com" />
                  </Form.Item>
                </Col>
                <Col xs={24} md={24} lg={8}>
                  <Form.Item
                    label="Address"
                    name="address"
                    rules={[{ required: true, message: 'Address is required' }]}
                  >
                    <Input type="text" placeholder="221B Baker Street, London" />
                  </Form.Item>
                </Col>
              </Row>
              <h4>Professional Details :</h4>
              <Row gutter={20}>
                <Col xs={24} md={24} lg={8}>
                  <Form.Item
                    label="Specialization"
                    name="specialization"
                    rules={[{ required: true, message: 'Specialization is required' }]}
                  >
                    <Input type="text" placeholder="Family Medicine" />
                  </Form.Item>
                </Col>
                <Col xs={24} md={24} lg={8}>
                  <Form.Item
                    label="Experience"
                    name="experience"
                    rules={[{ required: true, message: 'Experience is required' }]}
                  >
                    <Input type="text" placeholder="Princeton-Plainsboro Teaching Hospital" />
                  </Form.Item>
                </Col>
                <Col xs={24} md={24} lg={8}>
                  <Form.Item
                    label="Medical License"
                    name="license"
                    rules={[{ required: true, message: 'Medical License is required' }]}
                  >
                    <Input type="text" placeholder="1234" />
                  </Form.Item>
                </Col>
                <Col xs={24} md={24} lg={8}>
                  <Form.Item
                    label="Salary (Month)"
                    name="salary"
                    rules={[{ required: true, message: 'Salary is required' }]}
                  >
                    <Input type="text" placeholder="50000" />
                  </Form.Item>
                </Col>
                <Col xs={24} md={24} lg={8}>
                  <Form.Item label="Available Timeslot" name="time" rules={[{ required: true }]}>
                    <TimePicker.RangePicker format="HH:mm" />
                  </Form.Item>
                </Col>
                <Col xs={24} md={24} lg={8}>
                  <button type="submit" className="btn btn-primary form-btn">
                    Submit
                  </button>
                </Col>
              </Row>
            </Form>
          )}
        </Tabs.TabPane>
        <Tabs.TabPane tab="Change Password" key="2">
          <Form layout="vertical" onFinish={handlePasswordFinish} className="m-3">
            <Row gutter={20}>
              <Col xs={24} md={24} lg={8}>
                <Form.Item
                  label="Current Password"
                  name="currentPassword"
                  rules={[{ required: true, message: 'Current password is required' }]}
                >
                  <Input.Password placeholder="Enter current password" />
                </Form.Item>
              </Col>
              <Col xs={24} md={24} lg={8}>
                <Form.Item
                  label="New Password"
                  name="newPassword"
                  rules={[{ required: true, message: 'New password is required' }]}
                >
                  <Input.Password placeholder="Enter new password" />
                </Form.Item>
              </Col>
              <Col xs={24} md={24} lg={8}>
                <Form.Item
                  label="Confirm New Password"
                  name="confirmNewPassword"
                  dependencies={['newPassword']}
                  rules={[
                    { required: true, message: 'Please confirm your new password' },
                    ({ getFieldValue }) => ({
                      validator(_, value) {
                        if (!value || getFieldValue('newPassword') === value) {
                          return Promise.resolve()
                        }
                        return Promise.reject(new Error('The two passwords do not match!'))
                      },
                    }),
                  ]}
                >
                  <Input.Password placeholder="Confirm new password" />
                </Form.Item>
              </Col>
              <Col xs={24} md={24} lg={8}>
                <button type="submit" className="btn btn-primary form-btn">
                  Change Password
                </button>
              </Col>
            </Row>
          </Form>
        </Tabs.TabPane>
      </Tabs>
    </Layout>
  )
}

export default Profile