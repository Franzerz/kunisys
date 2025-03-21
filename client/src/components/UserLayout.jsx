import React, { useEffect, useState } from 'react';
import '../styles/LayoutStyles.css';
import { adminMenu, userMenu, doctorMenu } from '../Data/data';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Badge, message } from 'antd';
import axios from 'axios';
import dayjs from 'dayjs';

const UserLayout = ({ children }) => {
  const { user } = useSelector((state) => state.user);
  const location = useLocation();
  const navigate = useNavigate();
  const SidebarMenu = user?.isAdmin ? adminMenu : user?.isDoctor ? doctorMenu : userMenu;

  const handleLogout = () => {
    localStorage.clear();
    message.success('Logout Successfully');
    navigate('/login');
  };

  const [nextAppointment, setNextAppointment] = useState(null);
  const [queueCount, setQueueCount] = useState(0);

  useEffect(() => {
	const fetchQueueInfo = async () => {
	  try {
		const res = await axios.get('/api/v1/user/userAppointment', {
		  headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
		});
		if (res.data.success) {
		  const userAppointments = res.data.data.filter(app => dayjs(app.date).isAfter(dayjs()));
		  if (userAppointments.length > 0) {
			const nextApp = userAppointments.sort((a, b) => dayjs(a.date).diff(dayjs(b.date)))[0];
			setNextAppointment(nextApp);
			const queueRes = await axios.post('/api/v1/user/getDoctorAppointmentsByDay', {
			  doctorId: nextApp.doctorId,
			  date: dayjs(nextApp.date).format('DD-MM-YYYY')
			}, {
			  headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
			});
			
			if (queueRes.data.success) {
			  const allApps = queueRes.data.data.sort((a, b) => dayjs(a.time).diff(dayjs(b.time)));
			  const position = allApps.findIndex((app) => app._id === nextApp._id);
			  setQueueCount(position);
			}
		  }
		}
	  } catch (error) {
		console.error("Error fetching queue info", error);
	  }
	};
  
	if (user) {
	  fetchQueueInfo();
	}
  }, [user]);

  return (
    <div className="main">
      <div className="layout">
        <div className="sidebar">
        <div className="logo3"></div>
         <div className="logo-container">
 					<div className="logo4"></div>
 					<h6>KMC - Hospital</h6>
            <hr />
          </div>
          <div className="menu">
            {SidebarMenu.map((menu) => {
              const isActive = location.pathname === menu.path;
              return (
                <div className={`menu-item ${isActive ? "active" : ""}`} key={menu.path}>
                  <i className={menu.icon}></i>
                  <Link to={menu.path}>{menu.name}</Link>
                </div>
              );
            })}
            <div className="menu-item" onClick={handleLogout}>
              <i className="fa-solid fa-right-from-bracket"></i>
              <Link to="/login">Logout</Link>
            </div>
          </div>
        </div>
        <div className="content">
          <div className="header">
            <div
              className="header-content"
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '0 20px',
              }}
            >
              <div style={{ textAlign: 'left', fontSize: '18px', color: '#333' }}>
                {nextAppointment ? (
                  <>
                    <div>
                      Next appointment at: {dayjs(nextAppointment.date).format('DD-MM-YYYY')} {dayjs(nextAppointment.time).format('HH:mm')} with Dr. {nextAppointment.doctorInfo.firstName} {nextAppointment.doctorInfo.lastName}
                    </div>
                    <div>
                      Queue: {queueCount} appointment{queueCount === 1 ? "" : "s"} before you
                    </div>
                  </>
                ) : (
                  <div>No upcoming appointments</div>
                )}
              </div>
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <Badge count={user && user.notification.length} onClick={() => { navigate("/notification") }}>
                  <i className="fa-solid fa-bell"></i>
                </Badge>
                {user?.isDoctor ? (
                  <Link to={`/doctor/profile`} style={{ marginLeft: '10px' }}>{user?.name}</Link>
                ) : (
                  <Link to="/profile" style={{ marginLeft: '10px' }}>{user?.name}</Link>
                )}
              </div>
            </div>
          </div>
          <div className="body">{children}</div>
        </div>
      </div>
    </div>
  );
};

export default UserLayout;
