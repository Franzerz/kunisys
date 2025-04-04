import React from 'react'
import { Form, Input, Button, message } from 'antd'
import { useDispatch } from 'react-redux'
import { Link, useNavigate, useParams } from 'react-router-dom'
import axios from 'axios'
import { showLoading, hideLoading } from '../redux/features/alertSlice'
import '../styles/LoginStyles.css';
import { LockOutlined } from '@ant-design/icons'

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
		<div className="login-page">
			<div className="blurred-background"></div>
			<div className="content-wrapper">
				<div className="logo-container">
						<Link className="logo" to="/welcome" aria-label="Go to Welcome page"></Link>
						<Link className="logo2" to="/welcome" aria-label="Go to Welcome page"></Link></div>
					<div className="main-container">
						<div className="left-section">
						<button className="login-btn2">
																		Reset Password
																</button>
								<Form layout="vertical" onFinish={onFinish}>
									<Form.Item 
										name="newPassword" 
										rules={[{ required: true, message: 'Please input your new password' }]}
									>
										<Input.Password prefix={<LockOutlined />} placeholder="Enter new password" style={{ width: '350px' }}/>
									</Form.Item>
									<Form.Item 
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
										<Input.Password prefix={<LockOutlined />} placeholder="Confirm new password" />
									</Form.Item>
									<Button type="primary" htmlType="submit" style={{ width: '100%', marginBottom: '16px' , backgroundColor: '#3cbeb4 '}}>
										Reset Password
									</Button>
								</Form>
								<button
																				className="forgot-password-btn"
																				onClick={() => navigate('/login')}
																		>
																				Back to Login
																		</button>
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
	)
}

export default ResetPassword;
