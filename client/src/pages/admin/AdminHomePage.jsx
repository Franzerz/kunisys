import React, { useEffect, useState } from 'react';
import Layout from '../../components/Layout';
import { Calendar, message } from 'antd';
import axios from 'axios';
import dayjs from 'dayjs';

const AdminHomePage = () => {
  const [appointments, setAppointments] = useState([]);

  const fetchAppointments = async () => {
    try {
      const res = await axios.get('/api/v1/admin/getAllAppointments', {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      });
      if (res.data.success) {
        const approved = res.data.data.filter(app => app.status === 'approved');
        setAppointments(approved);
      }
    } catch (error) {
      console.error(error);
      message.error('Error fetching appointments');
    }
  };

  useEffect(() => {
    fetchAppointments();
  }, []);

  const appointmentsByDate = appointments.reduce((acc, app) => {
    const key = dayjs(app.date).format('YYYY-MM-DD');
    if (!acc[key]) acc[key] = [];
    acc[key].push(app);
    return acc;
  }, {});

  const cellRender = (current) => {
    const key = current.format('YYYY-MM-DD');
    const dayApps = appointmentsByDate[key] || [];
    return (
      <div>
        {dayApps.map((app, index) => (
          <div
            key={index}
            style={{
              background: '#ffd591',
              marginBottom: 2,
              padding: '2px 4px',
              borderRadius: 2,
              fontSize: 12,
            }}
          >
            {app.userInfo.name} booked with Dr. {app.doctorInfo.firstName} {app.doctorInfo.lastName} @ {dayjs(app.date).format('HH:mm')}
          </div>
        ))}
      </div>
    );
  };

  return (
    <Layout>
      <h1>All Activities</h1>
      <Calendar cellRender={cellRender} />
    </Layout>
  );
};

export default AdminHomePage;
