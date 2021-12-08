/* 

PAGE BUILT BY: JENNIFER

*/

import "../App.css";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function RegisterForm() {
  const [userInfo, setUserInfo] = useState({});
  const [error, setError] = useState("");
  let navigate = useNavigate();

  async function handleRegister(event) {
    event.preventDefault();
    setError("");

    if (!userInfo.firstName || !userInfo.lastName) {
      setError("First Name and Last Name cannot be null");
      return;
    }
    if (!userInfo.userName) {
      setError("User Name cannot be null");
      return;
    }
    if (!userInfo.email) {
      setError("Please input an email address");
    }
    if (!userInfo.pwd || userInfo.pwd.length < 6) {
      setError("Password should not less than 6 characters");
      return;
    }
    const rawData = await fetch("/api/register", {
      method: "POST",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(userInfo),
    });
    if (rawData.status === 200) {
      navigate("/login");
    } else {
      const res = await rawData.json();
      setError(res.msg || "Something's went wrong, please try again");
    }
  }

  return (
    <form onSubmit={handleRegister} className="font-setting">
      <div className="form-group">
        <div className="mb-3">
          <label htmlFor="Input-FirstName"> First Name </label>
          <input
            type="firstName"
            className="form-control"
            id="Input-FirstName"
            aria-describedby="firstName"
            name="firstName"
            onChange={(e) => {
              setUserInfo({ ...userInfo, firstName: e.target.value });
            }}
          />
        </div>
      </div>
      <div className="form-group">
        <div className="mb-3">
          <label htmlFor="Input-LastName"> Last Name </label>
          <input
            type="lastName"
            className="form-control"
            id="Input-LastName"
            aria-describedby="lastName"
            name="lastName"
            onChange={(e) => {
              setUserInfo({ ...userInfo, lastName: e.target.value });
            }}
          />
        </div>
      </div>
      <div className="form-group">
        <div className="mb-3">
          <label htmlFor="Input-UserName"> User Name </label>
          <input
            type="userName"
            className="form-control"
            id="Input-UserName"
            aria-describedby="userName"
            name="userName"
            onChange={(e) => {
              setUserInfo({ ...userInfo, userName: e.target.value });
            }}
          />
        </div>
      </div>
      <div className="form-group">
        <div className="mb-3">
          <label htmlFor="Input-Email"> Email Address </label>
          <input
            type="email"
            className="form-control"
            id="Input-Email"
            aria-describedby="emailHelp"
            name="email"
            onChange={(e) => {
              setUserInfo({ ...userInfo, email: e.target.value });
            }}
          />
        </div>
      </div>
      <div className="form-group">
        <div className="mb-3">
          <label htmlFor="Input-Password" className="form-label">
            Password
          </label>
          <input
            type="password"
            className="form-control"
            id="Input-Password"
            name="pwd"
            onChange={(e) => {
              setUserInfo({ ...userInfo, pwd: e.target.value });
            }}
          />
        </div>
      </div>
      <div className="form-group register-margin headup">
        <div className="mb-3">{error}</div>
      </div>
      <button type="submit" className="btn btn-color btn-block">
        Submit
      </button>
      <Link to="/login" className="link">
        Already have an account?
      </Link>
    </form>
  );
}

export default RegisterForm;