import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function ProductDetails() {
  const [product, setProduct] = useState();

  useEffect(() => {
    fetch("http://localhost:5000/getproduct")
      .then((res) => res.json())
      .then((result) => {
        setProduct(result);
      });
  }, []);

  return (
    <div className="container bg-light">
      <div className="container-fluid">
        <div className="row">
          <div className="col-12">
            <table className="table table-secondary table-hover table-bordered border-primary mt-2">
                <thead>
                    <tr>
                      <th scope="col">Name</th>
                      <th scope="col">Category</th>
                      <th scope="col">Price</th>
                      <th scope='col'>Available Stock</th>
                      <th scope='col'>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {
                    product?.map((data,i) => (
                    <tr key={`product-list-${i}`}>
                        <td>{data.Name}</td>
                        <td>{data.Category}</td>
                        <td>{data.Price}</td>
                        <td>{data.Stock}</td>
                        <td><Link to={`/userdashboard/orderproduct/${data._id}`}><button className='btn btn-primary'><i className="bi bi-cart-fill"></i> Click here to order</button></Link></td>
                        </tr>
                        ))
                    }
                </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
