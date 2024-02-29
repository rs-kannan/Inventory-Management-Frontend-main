import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";

export default function Orderproduct() {
  const [Name,setName] = useState()
  const [Price,setPrice] = useState()
  const [Quantity,setQuantity] = useState()
  const {id} = useParams()
  const navigate = useNavigate()

  useEffect(() => {
    fetch('http://localhost:5000/product/'+id)
    .then((res) => res.json())
    .then((result) => {
      setName(result.Name)
      setPrice(result.Price)
    })
    .catch((err) => console.log(err))
  }, [])

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch("http://localhost:5000/orderproduct", {
      method: "POST",
      crossDomain: true,
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify({Name,Price,Quantity}),
    })
      .then((res) => res.json())
      .then((result) => {
        if(result){
          Swal.fire({
            icon: "success",
            text: "Order Placed Successfully!!"
          })
          navigate('/userdashboard')
        }
      });
  };

  return (
    <div className="container bg-light">
      <div className="container-fluid">
        <div className="row mx-3">
          <form onSubmit={handleSubmit}>
          <h5 className="text-center text-success mt-4">
            <strong>Update Product</strong>
          </h5>
            <div className="addproduct">
              <label htmlFor="Name">Product Name</label>
              <br />
              <input
                type="text"
                id="Name"
                name="Name"
                placeholder="Enter Product Name"
                value={Name}
                onChange={e => setName(e.target.value)}
                disabled
              />
              <br />
              <label htmlFor="Price">Product Price</label>
              <br />
              <input
                type="text"
                id="Price"
                name="Price"
                placeholder="Enter Product Price"
                value={Price}
                onChange={e => setPrice(e.target.value)}
                disabled
              />
              <br />
              <label htmlFor="Quantity">Quantity</label>
              <br />
              <input
                type="text"
                id="Quantity"
                name="Quantity"
                placeholder="Enter Quantity"
                value={Quantity}
                onChange={e => setQuantity(e.target.value)}
              />
              <br />
              <button type="submit" className="btn btn-primary mt-3">
                Click here to Confirm Order
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
