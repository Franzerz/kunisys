import React from 'react';
import '../styles/RegisterStyles.css';
import {Form, Input, message} from 'antd';
import {useDispatch} from 'react-redux';
import {showLoading,hideLoading} from '../redux/features/alertSlice';
import {Link, useNavigate} from 'react-router-dom';
import axios from 'axios';

const Login = () => {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const onFinishHandler = async (values) => {
		try{
			dispatch(showLoading());
			const res = await axios.post('/api/v1/user/login', values);	
			dispatch(hideLoading());
			if(res.data.success) {
				localStorage.setItem('token', res.data.token);
				message.success('Login Successfully!');
				const token = localStorage.getItem('token');
				const config = { headers: { Authorization: `Bearer ${token}` } };
				const userRes = await axios.post('/api/v1/user/getUserData', { userId: res.data.token ? res.data.token : "" }, config);
				if (userRes.data.success) {
				  const userData = userRes.data.data;
				  if (userData.isAdmin) {
					navigate('/admin/home')
					window.location.reload()
				  } else if (userData.isDoctor) {
					navigate('/doctor/home')
					window.location.reload()
				  } else {
					navigate('/');
					window.location.reload()
				  }
				} else {
				  navigate('/');
				}
			} else {
				message.error(res.data.message);}
		} catch (error) {
			dispatch(hideLoading());
			console.log(error);
			message.error('Something went wrong');
	  }
	}

  return (
	<div className="form-container">
		<Form layout="vertical" onFinish={onFinishHandler} className="register-form">
			<h3 className="text-center">Login</h3>
			<Form.Item label="Email" name="email">
				<Input type="email" required />
			</Form.Item>
			<Form.Item label="Password" name="password">
				<Input type="password" required />
			</Form.Item>
			<p>Not a Member?<Link to="/register" className="m-2">Register here</Link></p>
			<p><Link to="/forgot-password">Forgot Password</Link></p>
			<button className="btn btn-primary" type="submit">Login</button>
		</Form>
	</div>
  );
};

export default Login;