import React, {useEffect,useState} from 'react'
import Layout from '../../components/Layout'
import axios from 'axios'
import { Table, message } from 'antd';


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
		  const res = await axios.post(
			'/api/v1/admin/deleteUser', {targetUserId: record._id},
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
			</div>
		  )}]
	
  return (
	<Layout>
		<h1 className="text-center m-2">User List</h1>
		<Table columns={columns} dataSource={users} />
	</Layout>
  )
}

export default Users