import React, { useState } from "react";
import "./connection.css";
import logo from "../../assets/photaty/logo.png";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Alert from "../../components/alert/Alert";

function Login() {
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const { email, password } = formData;
  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    axios
      .post("/api/users/login", formData)
      .then((res) => {
        localStorage.setItem("user", JSON.stringify(res.data));
        navigate("/");
        setFormData({
          email: "",
          password: "",
        });
      })
      .catch((error) => setError(error.response.data.message));
  };
  return (
    <div className="login">
      {error && <Alert error={error}/>}
      <div className="loginWrapper">
        <div className="loginLeft">
          <img className="loginLogo" src={logo} alt="logo" />
          <span className="loginDesc">
            Connect with friends and the world around you on
            <span className="photaty">Photaty</span>.
          </span>
        </div>
        <div className="loginRight">
          <div className="loginBox">
            <input
              type="text"
              value={email}
              name="email"
              onChange={onChange}
              placeholder="Email"
              className="loginInput"
              required
            />
            <input
              type="password"
              placeholder="Password"
              className="loginInput"
              value={password}
              name="password"
              onChange={onChange}
              required
            />
            <div className="btn">
              <button className="loginButton" onClick={(e) => onSubmit(e)}>
                Login
              </button>
              <p>
                Don't you have an account?{" "}
                <Link to="/register" className="span">
                  Register
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
