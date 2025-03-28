import React, { useEffect } from "react";
import { Navigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { showLoading, hideLoading } from "../redux/features/alertSlice";
import axios from "axios";
import { setUser } from "../redux/features/userSlice";

export default function ProtectedRoute({ children }) {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);
  const token = localStorage.getItem("token");

  useEffect(() => {
	const getUser = async () => {
	  try {
		dispatch(showLoading());
		const res = await axios.post(
		  "/api/v1/user/getUserData",
		  { token: token },
		  {
			headers: {
			  Authorization: `Bearer ${token}`,
			},
		  }
		);
		dispatch(hideLoading());
		if (res.data.success) {
		  dispatch(setUser(res.data.data));
		} else {
		  localStorage.clear();
		  return <Navigate to="/welcome" />;
		}
	  } catch (error) {
		dispatch(hideLoading());
		localStorage.clear();
		console.log(error);
		return <Navigate to="/welcome" />;
	  }
	};

	if (!user && token) {
	  getUser();
	}
  }, [user, token, dispatch]); // Removed getUser from deps, added dispatch

  if (token) {
	return children;
  } else {
	return <Navigate to="/welcome" />;
  }
}