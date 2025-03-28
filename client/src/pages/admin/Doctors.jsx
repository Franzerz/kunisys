import React, {useEffect,useState} from 'react'
import Layout from '../../components/Layout'
import axios from 'axios'
import { message, Table } from 'antd';
import '../../styles/Calendar.css';

const Doctors = () => {
	const [doctors, setDoctors] = useState([]);

	const getDoctors = async() => {
		try {
			const res = await axios.get('/api/v1/admin/getAllDoctors', {
				headers: {
					Authorization: `Bearer ${localStorage.getItem('token')}`
				}
			})
			if(res.data.success){
				setDoctors(res.data.data)
			}
		} catch (error) {
			console.log(error)

		}
	}

	const handleAccountStatus = async (record, status) => {
		try {
		  const res = await axios.post('/api/v1/admin/accountStatus', {doctorId: record._id, status},
			{
			  headers: {
				Authorization: `Bearer ${localStorage.getItem('token')}`
			  }
			}
		  );
		  if (res.data.success) {
			message.success(res.data.message);
			getDoctors();
		  }
		} catch (error) {
		  message.error('Something went wrong');
		}
	  }

	useEffect(() => {
		getDoctors()
	}, [])

	const columns = [
		{
		  title: 'Name',
		  dataIndex: 'name',
		  render: (text, record) => (
			<span>{record.firstName} {record.lastName}</span>
		  )
		},
		{ title: 'Specialization', dataIndex: 'specialization' },
		{ title: 'Status', dataIndex: 'status' },
		{ title: 'Phone', dataIndex: 'phone' },
		{
		  title: "Actions",
		  dataIndex: "actions",
		  render: (text, record) => (
			<div className="d-flex">
			  {record.status !== 'approved' && (
				<button className="btn btn-success" onClick={() => handleAccountStatus(record, 'approved')}>
				  Approve
				</button>
			  )}
			  <button className="btn btn-danger ms-2" onClick={() => handleAccountStatus(record, 'rejected')}>
				Reject
			  </button>
			</div>
		  )
		}
	  ];
	
  return (
	<Layout>
		<div className="ListofDoctors-button">List of Doctors</div>
		<div className="custom-table-container">
		<Table className="custom-table" columns={columns} dataSource={doctors} scroll={{ x: '100%' }}/></div>
	</Layout>
  )
}

export default Doctors