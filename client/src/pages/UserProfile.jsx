import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { showLoading, hideLoading } from '../redux/features/alertSlice'
import axios from 'axios'
import { Col, Form, Input, message, Row, Tabs } from 'antd'
import Layout from '../components/Layout'

const UserProfile = () => {
	const {user} = useSelector(state => state.user)
	const [userInfo, setUserInfo] = useState(null)
	const dispatch = useDispatch()
	const navigate = useNavigate()

	useEffect(() => {
		setUserInfo(user)
	}, [user])

	const handleProfileFinish = async (values) => {
		try {
		  dispatch(showLoading())
		  const res = await axios.post(
			'/api/v1/user/updateProfile',
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
	
  return (
	<Layout>
	<Tabs className="custom-tabs" defaultActiveKey="1">
	  <Tabs.TabPane tab="Profile" key="1">
		{userInfo && (
		  <Form
			layout="vertical"
			onFinish={handleProfileFinish}
			className="m-3"
			initialValues={{
			  name: userInfo.name,
			  email: userInfo.email,
			}}
		  >
			<Row gutter={20}>
			  <Col xs={24} md={24} lg={8}>
				<Form.Item label="Name" name="name" rules={[{ required: true, message: 'Name is required' }]}>
				  <Input placeholder="Enter your name" />
				</Form.Item>
			  </Col>
			  <Col xs={24} md={24} lg={8}>
				<Form.Item label="Email" name="email" rules={[{ required: true, message: 'Email is required' }]}>
				  <Input type="email" placeholder="Enter your email" />
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

export default UserProfile