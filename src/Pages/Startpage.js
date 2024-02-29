import React from 'react'
import { useNavigate } from 'react-router-dom'

export default function Startpage() {
    const navigate = useNavigate()

  return (
    <div className='d-flex justify-content-center align-items-center vh-100 loginPage'>
            <div className='p-3 rounded w-25 border loginForm text-center'>
                <h5>INVENTORY MANAGEMENT SYSTEM</h5>
                <p className='text-center'><b>Register as</b></p>
                <div className='d-flex justify-content-between mt-5'>
                    <button className='btn btn-danger btn-lg' onClick={e => navigate('/createuser')}>USER</button>
                    <button className='btn btn-success btn-lg' onClick={e => navigate('/createadmin')}>ADMIN</button>
                </div>
            </div>
        </div>
  )
}