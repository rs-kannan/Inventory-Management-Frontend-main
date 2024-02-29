import React,{useState} from "react";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

export default function UserLogin() {
    const [user,setUser] = useState({
        email: "",
        password: "",
      });
    const navigate = useNavigate()

    const handleSubmit = (e) => {
        e.preventDefault();
        fetch("http://localhost:5000/userlogin", {
          method: "POST",
          crossDomain: true,
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            "Access-Control-Allow-Origin": "*",
          },
          body: JSON.stringify({ ...user }),
        })
          .then((res) => res.json())
          .then((result) => {
            if (result.message === "Success") {
                window.localStorage.setItem("token",result.data)
              Swal.fire({
                icon: "success",
                text: "Login Successfully!!"
              });
              navigate('/userdashboard')
            } else {
              Swal.fire({
                icon: "error",
                text: result,
              });
            }
          });
      };

      function handleuserLogin(e){
        const userCopy = {...user}
        userCopy[e.target.id] = e.target.value
        setUser(userCopy)
      }

  return (
    <div className="d-flex justify-content-center align-items-center vh-100 loginPage">
      <div className="p-3 rounded w-25 border loginForm">
        <form onSubmit={handleSubmit}>
          <h4 className="text-center">LOGIN</h4>
          <div>
            <label htmlFor="email">
              <h5>Email</h5>
            </label>
            <br />
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Enter Email id"
              value={user['email']}
              onChange={handleuserLogin}
            />
          </div>
          <div>
            <label htmlFor="password">
              <h5>Password</h5>
            </label>
            <br />
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Enter your password"
              value={user['password']}
              onChange={handleuserLogin}
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
