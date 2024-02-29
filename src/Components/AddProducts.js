import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

export default function AddProducts() {
  const [item, setItem] = useState({
    Name: "",
    Category: "",
    Price: "",
    Stock: "",
  });
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch("http://localhost:5000/createproduct", {
      method: "POST",
      crossDomain: true,
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify({ ...item }),
    })
      .then((res) => res.json())
      .then((result) => {
        if (result === "Success") {
          Swal.fire({
            icon: "success",
            text: result,
          });
          navigate('/dashboard/productdetails')
        } else {
          Swal.fire({
            icon: "error",
            text: result,
          });
        }
      });
  };

  function handleItem(e){
    const ItemCopy = {...item}
    ItemCopy[e.target.id] = e.target.value;
    setItem(ItemCopy);
  }

  return (
    <div className="container bg-light">
      <div className="container-fluid">
        <div className="row mx-3">
          <form onSubmit={handleSubmit}>
          <h5 className="text-center text-success mt-4">
            <strong>Add Product</strong>
          </h5>
            <div className="addproduct">
              <label htmlFor="Name">Product Name</label>
              <br />
              <input
                type="text"
                id="Name"
                name="Name"
                placeholder="Enter Product Name"
                value={item["Name"]}
                onChange={handleItem}
              />
              <br />
              <label htmlFor="Category">Product Category</label>
              <br />
              <input
                type="text"
                id="Category"
                name="Category"
                placeholder="Enter Product Category"
                value={item["Category"]}
                onChange={handleItem}
              />
              <br />
              <label htmlFor="Price">Product Price</label>
              <br />
              <input
                type="text"
                id="Price"
                name="Price"
                placeholder="Enter Product Price"
                value={item["Price"]}
                onChange={handleItem}
              />
              <br />
              <label htmlFor="Stock">Available Stock</label>
              <br />
              <input
                type="text"
                id="Stock"
                name="Stock"
                placeholder="Available Stock"
                value={item["Stock"]}
                onChange={handleItem}
              />
              <br />
              <button type="submit" className="btn btn-success mt-3">
                Add Product
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
