import React, { useEffect, useState } from "react";

export default function UserDetails() {
  const [user, setUser] = useState();

  useEffect(() => {
    fetch("http://localhost:5000/getuser")
      .then((res) => res.json())
      .then((result) => {
        setUser(result);
      });
  }, []);

  return (
    <div className="container bg-light">
      <div className="container-fluid">
        <div className="row">
          <div className="col-12">
            <h3>List of Users</h3>
            <table className="table table-secondary table-hover table-bordered border-primary mt-2">
                <thead>
                    <tr>
                      <th scope="col">Name</th>
                      <th scope="col">Email</th>
                    </tr>
                </thead>
                <tbody>
                    {
                    user?.map((data,i) => (
                    <tr key={`users-list-${i}`}>
                        <td>{data.username}</td>
                        <td>{data.email}</td>
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
