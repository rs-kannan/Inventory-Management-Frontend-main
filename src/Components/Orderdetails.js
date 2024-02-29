import React, { useEffect, useState } from 'react'

export default function Orderdetails() {
    const [order,setOrder] = useState()

    useEffect(() => {
        fetch('http://localhost:5000/getorders')
        .then((res) => res.json())
        .then((result) => setOrder(result))
    },[])

  return (
     <div className="container bg-light">
      <div className="container-fluid">
        <div className="row">
          <div className="col-12">
            <h3>Order Details</h3>
            <table className="table table-secondary table-hover table-bordered border-primary mt-2">
                <thead>
                    <tr>
                      <th scope="col">Product Name</th>
                      <th scope="col">Price(Per Piece)</th>
                      <th scope="col">Quantity</th>
                    </tr>
                </thead>
                <tbody>
                    {
                    order?.map((data,i) => (
                    <tr key={`users-list-${i}`}>
                        <td>{data.Name}</td>
                        <td>{data.Price}</td>
                        <td>{data.Quantity}</td>
                        </tr>
                        ))
                    }
                </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}
