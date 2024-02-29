import React,{useState} from "react";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

export default function AdminLogin() {
    const [admin,setAdmin] = useState({
        email: "",
        password: "",
      });
    const navigate = useNavigate()

    const handleSubmit = (e) => {
        e.preventDefault();
        fetch("http://localhost:5000/adlogin", {
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
            if (result.message === "Success") {
                window.localStorage.setItem("token",result.data)
              Swal.fire({
                icon: "success",
                text: "Login Successfully!!"
              });
              navigate('/dashboard')
            } else {
              Swal.fire({
                icon: "error",
                text: result,
              });
            }
          });
      };

      function handleAdminLogin(e){
        const AdminCopy = {...admin}
        AdminCopy[e.target.id] = e.target.value
        setAdmin(AdminCopy)
      }

  return (
    <div className="d-flex justify-content-center align-items-center vh-100 loginPage">
      <div className="p-3 rounded w-25 border loginForm">
        <form onSubmit={handleSubmit}>
          <h4 className="text-center">Login</h4>
          <div>
            <label htmlFor="email">
              <h6>Email</h6>
            </label>
            <br />
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Enter Email id"
              value={admin['email']}
              onChange={handleAdminLogin}
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
              onChange={handleAdminLogin}
            />
          </div>
          <div className="row">
            <div class="d-grid gap-2 col-6 mx-auto">
              <button type="submit" className="btn btn-success mt-3">
                Login
              </button>
            </div>
            <div className="col-6">
              <Link to="/email" style={{ color: "red" }}>
                <p className="text-end">Forgot Password</p>
              </Link>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
