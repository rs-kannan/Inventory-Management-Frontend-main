import React, { useEffect, useState } from "react";
import { Link} from "react-router-dom";
import Swal from "sweetalert2";

export default function ProductDetails() {
  const [product, setProduct] = useState();

  useEffect(() => {
    fetch("http://localhost:5000/getproduct")
      .then((res) => res.json())
      .then((result) => {
        setProduct(result);
      });
  }, []);

  function handleDelete(id){
    fetch('http://localhost:5000/deleteproduct/'+id,{method: "DELETE"})
    .then((res) => res.json())
    .then((result) => {
      if(result === 'Deleted'){
        Swal.fire({
          icon: "success",
          text: result
        })
        window.location.reload()
      } else{
        Swal.fire({
          icon: "error",
          text: result
        })
      }
    })
  }

  return (
    <div className="container bg-light">
      <div className="container-fluid">
        <div className="row">
          <div className="col-12">
            <h3>Manage Products</h3>
            <table className="table table-secondary table-hover table-bordered border-primary mt-2">
                <thead>
                    <tr>
                      <th scope="col">Name</th>
                      <th scope="col">Category</th>
                      <th scope="col">Available Stock</th>
                      <th scope='col'>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {
                    product?.map((data,i) => (
                    <tr key={`users-list-${i}`}>
                        <td>{data.Name}</td>
                        <td>{data.Category}</td>
                        <td>{data.Stock}</td>
                        <td><Link to={`/dashboard/productdetails/editproduct/${data._id}`}><button className='btn btn-primary'><i className="bi bi-pencil-fill"></i> Edit</button></Link>
                        <button className='btn btn-danger mx-1' onClick={(e) => handleDelete(data._id)}><i className="bi bi-trash-fill"></i> Delete</button></td>
                        </tr>
                        ))
                    }
                </tbody>
            </table>
          </div>
          <div class="d-grid gap-2 d-md-block">
            <Link to="/dashboard/productdetails/addproduct">
              <button class="btn btn-danger" type="button">
                Add New Product
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
