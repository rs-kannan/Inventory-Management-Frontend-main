import React, { useEffect, useState } from "react";
import "bootstrap-icons/font/bootstrap-icons.css";
import { Piechart } from "../Charts/Piechart";
import { Linechart } from "../Charts/Linechart";

export default function Home() {
  const [count, setCount] = useState();
  const [user, setUser] = useState();
  const [order, setOrder] = useState();
  const [admin,setAdmin] = useState()

  useEffect(() => {
    fetch("http://localhost:5000/productcount")
      .then((res) => res.json())
      .then((result) => setCount(result));

    fetch("http://localhost:5000/usercount")
      .then((res) => res.json())
      .then((result) => setUser(result));

    fetch("http://localhost:5000/ordercount")
      .then((res) => res.json())
      .then((result) => setOrder(result));

    fetch("http://localhost:5000/admincount")
      .then((res) => res.json())
      .then((result) => setAdmin(result));  
  }, []);

  return (
    <div className="p-3 bg-light">
      <div className="container-fluid">
        <div className="row">
          <div className="col-12 col-sm-6 col-md-4 col-lg-3 p-3 bg-light">
            <div className="d-flex justify-content-around align-items-center p-4 border border-secondary shadow-sm">
              <i className="bi bi-cart-check-fill fs-1"></i>
              <div>
                <span>Total Product</span>
                <h2>{count}</h2>
              </div>
            </div>
          </div>
          <div className="col-12 col-sm-6 col-md-4 col-lg-3 p-3 bg-light">
            <div className="d-flex justify-content-around align-items-center p-4 border border-secondary shadow-sm">
              <i className="bi bi-truck fs-1"></i>
              <div>
                <span>Orders</span>
                <h2>{order}</h2>
              </div>
            </div>
          </div>
          <div className="col-12 col-sm-6 col-md-4 col-lg-3 p-3 bg-light">
            <div className="d-flex justify-content-around align-items-center p-4 border border-secondary shadow-sm">
              <i className="bi bi-person-fill fs-1"></i>
              <div>
                <span>Users</span>
                <h2>{user}</h2>
              </div>
            </div>
          </div>
          <div className="col-12 col-sm-6 col-md-4 col-lg-3 p-3 bg-light">
            <div className="d-flex justify-content-around align-items-center p-4 border border-secondary shadow-sm">
              <i className="bi bi-person-circle fs-1"></i>
              <div>
                <span>Admin</span>
                <h2>{admin}</h2>
              </div>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-12 col-md-8 p-3">
            <Piechart />
          </div>
          <div className="row">
          <div className="col-12 col-md-4 p-3">
            <Linechart />
          </div>
          </div>
        </div>
      </div>
    </div>
  );
}
