import React,{useState} from 'react'
import { useNavigate,useParams } from 'react-router-dom'
import Swal from 'sweetalert2'

export default function Password() {
  const [password,setPassword] = useState()
    const navigate = useNavigate()
    const {id,token} = useParams()

    const handleSubmit = (e) => {
      e.preventDefault();
      fetch(`http://localhost:5000/reset-password/${id}/${token}`, {
        method: "POST",
        crossDomain: true,
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          "Access-Control-Allow-Origin": "*",
        },
        body: JSON.stringify({password}),
      })
        .then((res) => res.json())
        .then((result) => {
          if (result.message === 'Error') {
            Swal.fire({
              icon: "error",
              text: "Password not updated!!"
            });
          } else {
            Swal.fire({
              icon: "success",
              text: "Password Updated Successfully!!",
            });
            navigate('/')
          }
        });
    };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100 loginPage">
    <div className="p-3 rounded w-25 border loginForm">
      <form onSubmit={handleSubmit}>
        <h4 className="text-center">Reset Password</h4>
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
            onChange={e => setPassword(e.target.value)}
          />
        </div>
        <div class="d-grid gap-2 d-md-block mt-3">
            <button class="btn btn-danger" type="submit">
              Reset Password
            </button>
          </div>
        </form>
        </div>
        </div>

  )
}
