import React, { useState } from 'react';
import '../styles/LoginStyles.css';
import { Form, Input, Checkbox, message } from 'antd';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { showLoading, hideLoading } from '../redux/features/alertSlice';
import { UserOutlined, MailOutlined, LockOutlined } from '@ant-design/icons'

const Register = () => {
	const [acceptedTerms, setAcceptedTerms] = useState(false);
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const [activeTab, setActiveTab] = useState('register');

	const onFinishHandler = async (values) => {
		if (!acceptedTerms) {
			message.error("You must agree to the Terms and Conditions before registering.");
			return;
		}
		if (values.password !== values.confirmPassword) {
			message.error("Passwords do not match!");
			return;
		}
		try {
			dispatch(showLoading());
			const res = await axios.post('/api/v1/user/register', values);
			dispatch(hideLoading());
			if (res.data.success) {
				message.success('Registered Successfully!');
				navigate('/login');
			} else {
				message.error(res.data.message);
			}
		} catch (error) {
			dispatch(hideLoading());
			console.error(error);
			message.error('Something went wrong');
		}
	};

	const handleTabSwitch = (tab) => {
		setActiveTab(tab);
		if (tab === 'register') {
			navigate('/register');
		} else if (tab === 'login') {
			navigate('/login');
		}
	};

	return (
		<div className="login-page">
			<div className="blurred-background"></div>
			<div className="content-wrapper">
			<div className="logo-container">
				<Link className="logo" to="/welcome" aria-label="Go to Welcome page"></Link>
				<Link className="logo2" to="/welcome" aria-label="Go to Welcome page"></Link>
			</div>
				<div className="main-container">
					<div className="left-section">
						<div className="tabs">
							<button
								className={`sliding-btn ${activeTab === 'login' ? 'active' : ''}`}
								onClick={() => handleTabSwitch('login')}
							>
								Login
							</button>
							<button
								className={`sliding-btn ${activeTab === 'register' ? 'active' : ''}`}
								onClick={() => handleTabSwitch('register')}
							>
								Register
							</button>
							<div
								className="slider"
								style={{
									left: activeTab === 'login' ? '0' : '120px',
								}}
							></div>
						</div>
						<Form layout="vertical" onFinish={onFinishHandler} className="login-form">
						<Form.Item
							name="name"
							rules={[{ required: true, message: 'Please enter your name' }]}
						>
							<Input
								prefix={<UserOutlined />}
								placeholder="Enter your name"
							/>
						</Form.Item>
						<Form.Item
							name="email"
							rules={[{ required: true, type: 'email', message: 'Please enter a valid email' }]}
						>
							<Input
								prefix={<MailOutlined />}
								placeholder="Enter your email"
							/>
						</Form.Item>
						<Form.Item
							name="password"
							rules={[{ required: true, message: 'Please enter your Password' }]}
						>
							<Input.Password
								prefix={<LockOutlined />}
								placeholder="Enter your password"
							/>
						</Form.Item>
						<Form.Item
							name="confirmPassword"
							dependencies={['password']}
							rules={[
								{ required: true, message: 'Please confirm your password' },
								({ getFieldValue }) => ({
									validator(_, value) {
										if (!value || getFieldValue('password') === value) {
											return Promise.resolve();
										}
										return Promise.reject(new Error('The two passwords do not match!'));
									},
								}),
							]}
						>
							<Input.Password
								prefix={<LockOutlined />}
								placeholder="Confirm your Password"
							/>
						</Form.Item>
							<div className="additional-info">
								Already a member? <span>&nbsp;</span>
								<Link to="/login" className="additional-info">
									Login here
								</Link>
							</div>
							<Form.Item className="terms-checkbox">
								<Checkbox onChange={(e) => setAcceptedTerms(e.target.checked)}>
								<span className="terms-checkbox">I agree to all <span>&nbsp;</span><Link to="/terms"> Terms and Conditions.</Link></span>
								</Checkbox>
							</Form.Item>
							<button className="login-btn" type="submit">
								Register
							</button>
						</Form>
					</div>
					<div className="right-section">
					<div className="welcome-message">
							Welcome to Kqueue, a queue management system for KMC Hospital and KMITL Sport Center. By
							registering or using our services, you agree to the following Terms & Conditions.
						</div>
						<div className="open-hour">
							<div className="info-row">
								<div className="info-header">
									<div className="icon-container">
										<i className="fas fa-clock"></i>
									</div>
									<h3>Open hour</h3>
								</div>
								<div className="info-content">
									<p>Monday to Friday: 08:00 a.m. - 18:00 p.m.</p>
									<p>Saturday to Sunday: 09:00 a.m. - 12:00 p.m.</p>
									<p>Public Holiday: 08:30 a.m. - 17:00 p.m.</p>
								</div>
							</div>
							<div className="contacts">
							<div className="info-row">
								<div className="info-header">
									<div className="icon-container">
										<i className="fas fa-user"></i>
									</div>
									<h3>Contacts</h3>
								</div>
								<div className="info-content">
									<p><i className="fab fa-facebook"></i> ศูนย์การแพทย์ สจล. KMITL Medical Center</p>
									<p><i className="fas fa-globe"></i> <a href="https://kmchf-pp.org" target="_blank" rel="noopener noreferrer">https://kmchf-pp.org</a></p>
									<p><i className="fas fa-phone"></i> 02 329 8143, 02 329 8000 - 3633</p>
								</div>
								
							</div>
							<div className="location">
							<div className="info-row">
								<div className="info-header">
									<div className="icon-container">
										<i className="fas fa-map-marker-alt"></i>
									</div>
									<h3>Location</h3>
								</div>
								<div className="info-content">
									<p><span>Address:</span> 3 Thanon Chalong Krung, Lam Prathew, Lat Krabang, Bangkok 10520</p>
									<p><span>Located at:</span>King Mongkut's Institute of<br/>Technology Ladkrabang</p>
								</div>
							</div>
						</div>
						</div>
							<div className="flexible-line">
									kque.support@gmail.com
									</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Register;