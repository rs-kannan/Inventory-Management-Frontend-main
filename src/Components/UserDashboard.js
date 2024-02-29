import React,{useEffect} from 'react'
import 'bootstrap-icons/font/bootstrap-icons.css'
import { Link, Outlet, useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2';

export default function UserDashboard() {
    const navigate = useNavigate()

    useEffect(() => {
        fetch("http://localhost:5000/userdata", {
          method: "POST",
          crossDomain: true,
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            "Access-Control-Allow-Origin": "*",
          },
          body: JSON.stringify({
            token: window.localStorage.getItem("token"),
          }),
        })
          .then((res) => res.json())
          .then((result) => {
            if(result.message === "VERIFIED"){
                navigate('/userdashboard')
            }
            else{
                Swal.fire({
                    icon: "error",
                    text: `Token ${result.message}`
                })
            }
          });
      }, []);

    function handleLogout() {
        window.localStorage.clear();
        navigate("/");
    }

  return (
    <div className="container-fluid">
    <div className="row flex-nowrap">
        <div className="col-auto col-md-3 col-xl-2 px-sm-2 px-0 bg-dark">
            <div className="d-flex flex-column align-items-center align-items-sm-start px-3 pt-2 text-white min-vh-100">
                <a href="/userdashboard" className="d-flex align-items-center pb-3 mb-md-1 mt-md-3 me-md-auto text-white text-decoration-none">
                    <span className="fs-5 fw-bolder d-none d-sm-inline">User Dashboard</span>
                </a>
                <ul className="nav nav-pills flex-column mb-sm-auto mb-0 align-items-center align-items-sm-start" id="menu">
                    <li>
                        <Link to="/userdashboard" data-bs-toggle="collapse" className="nav-link text-white px-0 align-middle">
                            <i className="fs-4 bi-speedometer2"></i> <span className="ms-1 d-none d-sm-inline">Product Details</span> </Link>
                    </li>                    
                    <li>
                        <button className="nav-link px-0 align-middle text-white">
                            <i className="fs-4 bi-power"></i> <span className="ms-1 d-none d-sm-inline" onClick={handleLogout}>Logout</span></button>
                    </li>
                </ul>
            </div>
        </div>
        <div class="col p-0 m-0">
            <div className='p-2 d-flex justify-content-center shadow'>
                <h4>Inventory Management System</h4>						
            </div>
            <Outlet />
        </div>
    </div>
</div>  )
}
