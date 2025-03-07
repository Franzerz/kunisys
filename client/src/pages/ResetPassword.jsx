import React from 'react'
import { Form, Input, Button, message } from 'antd'
import { useDispatch } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import axios from 'axios'
import { showLoading, hideLoading } from '../redux/features/alertSlice'

const ResetPassword = () => {
  const { token } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  const onFinish = async (values) => {
    try {
      dispatch(showLoading());
      const res = await axios.post('/api/v1/user/resetPassword', { token, newPassword: values.newPassword });
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
      <h1 style={{ textAlign: 'center' }}>Reset Password</h1>
      <Form layout="vertical" onFinish={onFinish}>
        <Form.Item 
          label="New Password" 
          name="newPassword" 
          rules={[{ required: true, message: 'Please input your new password' }]}
        >
          <Input.Password placeholder="Enter new password" />
        </Form.Item>
        <Form.Item 
          label="Confirm New Password" 
          name="confirmNewPassword" 
          dependencies={['newPassword']}
          rules={[
            { required: true, message: 'Please confirm your new password' },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue('newPassword') === value) {
                  return Promise.resolve();
                }
                return Promise.reject(new Error('The two passwords do not match!'));
              },
            }),
          ]}
        >
          <Input.Password placeholder="Confirm new password" />
        </Form.Item>
        <Button type="primary" htmlType="submit" style={{ width: '100%' }}>
          Reset Password
        </Button>
      </Form>
    </div>
  )
}

export default ResetPassword;
