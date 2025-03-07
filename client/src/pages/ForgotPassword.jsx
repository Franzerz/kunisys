import React from 'react'
import { Form, Input, Button, message } from 'antd'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { showLoading, hideLoading } from '../redux/features/alertSlice'
import { useDispatch } from 'react-redux'

const ForgotPassword = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  const onFinish = async (values) => {
    try {
      dispatch(showLoading());
      const res = await axios.post('/api/v1/user/forgotPassword', values);
      dispatch(hideLoading());
      if (res.data.success) {
        message.success(res.data.message);
        navigate('/login');
      } else {
        message.error(res.data.message);
      }
    } catch (error) {
      dispatch(hideLoading());
      console.log(error);
      message.error("Something went wrong");
    }
  }
  
  return (
    <div style={{ padding: '50px', maxWidth: '400px', margin: 'auto' }}>
      <h1 style={{ textAlign: 'center' }}>Forgot Password</h1>
      <Form layout="vertical" onFinish={onFinish}>
        <Form.Item 
          label="Email" 
          name="email" 
          rules={[{ required: true, message: 'Please input your email' }]}
        >
          <Input type="email" placeholder="Enter your email" />
        </Form.Item>
        <Button type="primary" htmlType="submit" style={{ width: '100%' }}>
          Send Reset Link
        </Button>
      </Form>
    </div>
  )
}

export default ForgotPassword;
