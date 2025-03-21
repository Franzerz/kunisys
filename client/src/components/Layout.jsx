import React from 'react'
import '../styles/LayoutStyles.css'
import { adminMenu, userMenu, doctorMenu } from '../Data/data'
import { Link,useLocation, useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { Badge, message } from 'antd'

const Layout = ({children}) => {
	const {user} = useSelector(state => state.user)
	const location = useLocation()
	const navigate = useNavigate()

	const SidebarMenu = user?.isAdmin ? adminMenu: user?.isDoctor ? doctorMenu: userMenu;
	const handleLogout = () => {
		localStorage.clear()
		message.success('Logout Successfully')
		navigate('/login')
	}
  return (
	<>
	<div className="main">
		<div className="layout">
			<div className="sidebar">
			<div className="logo3"></div>
 				<div className="logo-container">
 					<div className="logo4"></div>
 					<h6>KMC - Hospital</h6>
 				</div>
				<div className="menu">
					{SidebarMenu.map((menu) => {
						const isActive = location.pathname === menu.path
						return(
							<>
								<div className={`menu-item ${isActive && "active"}`}>
									<i className={menu.icon}></i>
									<Link to={menu.path}>{menu.name}</Link>
								</div>
							</>
						);
					})}
					<div className={`menu-item `} onClick={handleLogout}>
									<i className="fa-solid fa-right-from-bracket"></i>
									<Link to="/login">Logout</Link>
								</div>
				</div>
			</div>
			<div className="content">
				<div className="header">
					<div className="header-content" style={{cursor: 'pointer'}}>
						<Badge count={user && user.notification.length} onClick={() => {navigate("/notification")}}>
							<i class="fa-solid fa-bell"></i>
						</Badge>		
						{user?.isDoctor ? (
							<Link to={`/doctor/profile`}>{user?.name}</Link>
						) : (
							<Link to="/profile">{user?.name}</Link>)}
					</div>
				</div>
				<div className="body">{children}</div>
			</div>	
		</div>
	</div>
	</>
  )
}

export default Layout