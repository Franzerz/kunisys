import React, { useState } from 'react';
import { Form, Input, Checkbox, message } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { showLoading, hideLoading } from '../redux/features/alertSlice';
import axios from 'axios';
import '../styles/LoginStyles.css';
import { UserOutlined, LockOutlined } from '@ant-design/icons'

const Login = () => {
    const [acceptedTerms, setAcceptedTerms] = useState(false);
    const [activeTab, setActiveTab] = useState('login');
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const onFinishHandler = async (values) => {
        if (!acceptedTerms) {
            message.error('You must accept the Terms and Conditions before logging in.');
            return;
        }

        try {
            dispatch(showLoading());
            const res = await axios.post('/api/v1/user/login', values);
            dispatch(hideLoading());
            if (res.data.success) {
                localStorage.setItem('token', res.data.token);
                message.success('Login Successfully!');
                const token = localStorage.getItem('token');
                const config = { headers: { Authorization: `Bearer ${token}` } };
                const userRes = await axios.post(
                    '/api/v1/user/getUserData',
                    { userId: res.data.token ? res.data.token : "" },
                    config
                );
                if (userRes.data.success) {
					const userData = userRes.data.data;
                    if (userData.isAdmin) {
                        navigate('/admin/home');
                        window.location.reload();
                    } else if (userData.isDoctor) {
                        navigate('/doctor/home');
                        window.location.reload();
                    } else {
                        navigate('/');
                        window.location.reload();
                    }
                } else {
                    navigate('/');
                }
            } else {
                message.error(res.data.message);
            }
        } catch (error) {
            dispatch(hideLoading());
            console.log(error);
            message.error('Something went wrong');
        }
    };

    const handleTabSwitch = (tab) => {
        setActiveTab(tab);
        if (tab === 'register') {
            navigate('/register');
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
                        {activeTab === 'login' && (
                            <Form layout="vertical" onFinish={onFinishHandler} className="login-form">
                                <Form.Item
                                    name="email"
                                    rules={[{ required: true, message: 'Please enter your email' }]}
                                >
                                    <Input
                                        prefix={<UserOutlined />}
                                        placeholder="Enter your email"
                                    />
                                </Form.Item>
                                <Form.Item
                                    name="password"
                                    rules={[{ required: true, message: 'Please enter your password' }]}
                                >
                                    <Input.Password
                                        prefix={<LockOutlined />}
                                        placeholder="Enter your password"
                                    />
                                </Form.Item>
                                <div className="additional-info">
                                    <button
                                        className="forgot-password-btn"
                                        onClick={() => navigate('/forgot-password')}
                                    >
                                        Forgot password
                                    </button>
                                </div>
                                <Form.Item className="terms-checkbox">
                                    <Checkbox
                                        onChange={(e) => setAcceptedTerms(e.target.checked)}
                                    >
                                        I agree to all Terms and Conditions.
                                    </Checkbox>
                                </Form.Item>
                                <button className="login-btn" type="submit">
                                    Login
                                </button>
                            </Form>
                        )}
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
                                    <p><i className="fas fa-globe"></i> <a href="http://medicalcenter.kmitl.ac.th/service/" target="_blank" rel="noopener noreferrer">http://medicalcenter.kmitl.ac.th/service/</a></p>
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

export default Login;