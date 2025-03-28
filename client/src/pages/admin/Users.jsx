import React, {useEffect,useState} from 'react'
import Layout from '../../components/Layout'
import axios from 'axios'
import { Table, message } from 'antd';
import '../../styles/Calendar.css';


const Users = () => {
	const [users, setUsers] = useState([]);

	const getUsers = async() => {
		try {
			const res = await axios.get('/api/v1/admin/getAllUsers', {
				headers: {
					Authorization: `Bearer ${localStorage.getItem('token')}`
				}
			})
			if(res.data.success){
				setUsers(res.data.data)
			}
		} catch (error) {
			console.log(error)

		}
	}

	useEffect(() => {
		getUsers()
	}, [])

	const handleBlock = async (record) => {
		try {
		  const res = await axios.post('/api/v1/admin/deleteUser', {targetUserId: record._id},
			{
			  headers: {
				Authorization: `Bearer ${localStorage.getItem('token')}`
			  }
			}
		  )
		  if (res.data.success) {
			message.success(res.data.message)
			getUsers()
		  } else {
			message.error(res.data.message)
		  }
		} catch (error) {
		  message.error('Error blocking user')
		}
	  }
	
	const handleGiveAdmin = async (record) => {
		try {
		  const res = await axios.post('/api/v1/admin/giveAdmin', {targetUserId: record._id},
			{
			  headers: {
				Authorization: `Bearer ${localStorage.getItem('token')}`
			  }
			}
		  );
		  if (res.data.success) {
			message.success(res.data.message);
			getUsers();
		  } else {
			message.error(res.data.message);
		  }
		} catch (error) {
		  message.error('Error promoting user');
		}
	  };

	const columns = [
		{title: 'Name', dataIndex: 'name'},
		{title: 'Email', dataIndex: 'email'},
		{title: 'Admin', dataIndex: 'isAdmin',
			render: (text, record) => <span>{record.isAdmin ? "Yes" : "No"}</span>
		},
		{title: 'Doctor', dataIndex: 'isDoctor',
			render: (text, record) => <span>{record.isDoctor ? "Yes" : "No"}</span>
		},
		{title: "Actions", dataIndex: "actions",
			render: (text, record) => (
			<div className="d-flex">
				<button className="btn btn-danger" onClick={() => handleBlock(record)}>Block</button>
				{!record.isAdmin && (
					<button className="btn btn-primary ms-2" onClick={() => handleGiveAdmin(record)}>Give Admin</button>
				)}
			</div>
		  )}]
	
  return (
	<Layout>
		<div className="ListofDoctors-button">User Lists</div>
		<Table className="custom-table " columns={columns} dataSource={users} scroll={{ x: '100%' }}/>
	</Layout>
  )
}

export default Users