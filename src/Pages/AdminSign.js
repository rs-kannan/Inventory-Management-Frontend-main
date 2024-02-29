import React, { useState } from 'react'
import {Link, useNavigate} from 'react-router-dom'
import Swal from 'sweetalert2'

export default function AdminSign() {
  const [admin,setAdmin] = useState({
    username: "",
    email: "",
    password: ""
  })
  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch("http://localhost:5000/createadmin", {
      method: "POST",
      crossDomain: true,
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify({ ...admin }),
    })
      .then((res) => res.json())
      .then((result) => {
        if (result === "User Already existing") {
          Swal.fire({
            icon: "error",
            text: result,
          });
        } else {
          Swal.fire({
            icon: "success",
            text: result,
          });
          navigate("/adminlogin");
        }
      });
  };

  function handleAdmin(e){
    const AdminCopy = {...admin}
    AdminCopy[e.target.id] = e.target.value
    setAdmin(AdminCopy)
  }

  return (
    <div>
      <div className="d-flex justify-content-center align-items-center vh-100 loginPage">
      <div className="p-3 rounded w-25 border loginForm">
        <form onSubmit={handleSubmit}>
          <h4 className="text-center">Registration</h4>
          <div>
            <label htmlFor="username">
              <h6>UserName</h6>
            </label>
            <br />
            <input
              type="text"
              id="username"
              name="username"
              placeholder="Enter your name"
              value={admin['username']}
              onChange={handleAdmin}
          />
          </div>
          <div>
            <label htmlFor="email">
              <h6>Email</h6>
            </label>
            <br />
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Enter Email"
              value={admin['email']}
              onChange={handleAdmin}
            />
          </div>
          <div>
            <label htmlFor="password">
              <h6>Password</h6>
            </label>
            <br />
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Enter your password"
              value={admin['password']}
              onChange={handleAdmin}
            />
          </div>
          <div className="row">
            <div class="d-grid gap-2 col-6 mx-auto">
              <button type="submit" className="btn btn-success mt-3">
                SignUp
              </button>
            </div>
            <div className="col-6"> 
                <p className="text-end">Having account <Link to='/adminlogin' style={{ color: "red" }}>Sign</Link></p>
            </div>
          </div>
        </form>
      </div>
    </div>
    </div>
  )
}
