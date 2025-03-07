import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { showLoading, hideLoading } from '../redux/features/alertSlice'
import axios from 'axios'
import { Col, Form, Input, message, Row } from 'antd'
import Layout from '../components/Layout'

const UserProfile = () => {
	const {user} = useSelector(state => state.user)
	const [userInfo, setUserInfo] = useState(null)
	const dispatch = useDispatch()
	const navigate = useNavigate()

	useEffect(() => {
		setUserInfo(user)
	}, [user])

	const handleFinish = async (values) => {
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
	
  return (
	<Layout>
      <h1>Manage Profile</h1>
      {userInfo && (
        <Form layout="vertical" onFinish={handleFinish} className="m-3" initialValues={{
            name: userInfo.name,
            email: userInfo.email,
          }}>
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
              <button type="submit" className="btn btn-primary form-btn">Submit</button>
            </Col>
          </Row>
        </Form>
      )}
    </Layout>
  )
}

export default UserProfile