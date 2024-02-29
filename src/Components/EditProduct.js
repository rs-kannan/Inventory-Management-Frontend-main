import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

export default function EditProduct() {
    const [Name,setName] = useState()
    const [Category,setCategory] = useState()
    const [Price,setPrice] = useState()
    const [Stock,setStock] = useState()
    const {id} = useParams()
    const navigate = useNavigate()

    useEffect(() => {
      fetch('http://localhost:5000/product/'+id)
      .then((res) => res.json())
      .then((result) => {
        setName(result.Name)
        setCategory(result.Category)
        setPrice(result.Price)
        setStock(result.Stock)
      })
      .catch((err) => console.log(err))
    }, [])

    const handleSubmit = (e) => {
      e.preventDefault();
      fetch("http://localhost:5000/updateproduct/"+id, {
        method: "PUT",
        crossDomain: true,
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          "Access-Control-Allow-Origin": "*",
        },
        body: JSON.stringify({Name,Category,Price,Stock}),
      })
        .then((res) => res.json())
        .then((result) => {
          if(result){
            navigate('/dashboard/productdetails')
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
              />
              <br />
              <label htmlFor="Category">Product Category</label>
              <br />
              <input
                type="text"
                id="Category"
                name="Category"
                placeholder="Enter Product Category"
                value={Category}
                onChange={e => setCategory(e.target.value)}
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
              />
              <br />
              <label htmlFor="Stock">Available Stock</label>
              <br />
              <input
                type="text"
                id="Stock"
                name="Stock"
                placeholder="Available Stock"
                value={Stock}
                onChange={e => setStock(e.target.value)}
              />
              <br />
              <button type="submit" className="btn btn-primary mt-3">
                Update Product
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
