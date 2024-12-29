// import React from "react";
// import "../styles/RegisterStyles.css";
// import { Form, Input, message } from "antd";
// import { Link, useNavigate } from "react-router-dom";
// import axios from "axios";

// const Login = () => {
//   const navigate = useNavigate();
//   const onFinishHandler = async (values) => {
//     try {
//       const res = await axios.post("/api/v1/user/login", values);
//       if (res.data.success) {
//         localStorage.setItem("token", res.data.token);
//         message.success("Login Successfully!");
//         navigate("/");
//       } else {
//         message.error(res.data.message);
//       }
//     } catch (error) {
//       console.log(error);
//       message.error("Something went wrong");
//     }
//   };
//   return (
//     <div className="form-container">
//       <Form
//         layout="vertical"
//         onFinish={onFinishHandler}
//         className="register-form"
//       >
//         <h3 className="text-center">Login</h3>
//         <Form.Item label="Email" name="email">
//           <Input type="email" required />
//         </Form.Item>
//         <Form.Item label="Password" name="password">
//           <Input type="password" required />
//         </Form.Item>
//         <p>
//           Not a Member?
//           <Link to="/register" className="m-2">
//             Register here
//           </Link>
//         </p>
//         <button className="btn btn-primary" type="submit">
//           Login
//         </button>
//       </Form>
//     </div>
//   );
// };

// export default Login;

import React from "react";
import "./LoginStyles.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faLock } from "@fortawesome/free-solid-svg-icons";

const Login = () => {
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;

    try {
      const res = await axios.post("/api/v1/user/login", { email, password });
      if (res.data.success) {
        localStorage.setItem("token", res.data.token);
        alert("Login Successfully!");
        navigate("/");
      } else {
        alert(res.data.message);
      }
    } catch (error) {
      console.log(error);
      alert("Something went wrong");
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h1 className="login-title">Google Authentication</h1>
        <p className="login-subtitle">Using university's Email Account</p>

        <div className="google-auth">
          <button className="google-button">
            <img src="../images/google-icon.webp" alt="Google" className="google-icon" />
          </button>
        </div>

        <div className="divider">
          <span className="divider-line"></span>
          <span className="divider-text">or</span>
          <span className="divider-line"></span>
        </div>

        <form onSubmit={handleSubmit} className="login-form">
          <div className="input-group">
            <FontAwesomeIcon icon={faUser} className="input-icon" />
            <input
              type="email"
              name="email"
              placeholder="EMAIL"
              required
              className="login-input"
            />
          </div>

          <div className="input-group">
            <FontAwesomeIcon icon={faLock} className="input-icon" />
            <input
              type="password"
              name="password"
              placeholder="PASSWORD"
              required
              className="login-input"
            />
          </div>

          <div className="SubmitContainer">
            <button type="submit" className="login-button">
              LOGIN
            </button>
          </div>
        </form>

        <p className="signup-text">Doesn't have account?</p>
      </div>
    </div>
  );
};

export default Login;
