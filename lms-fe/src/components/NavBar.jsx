import React from 'react'
import { useNavigate } from 'react-router-dom'

function NavBar() {
  let role = sessionStorage.getItem('role')
  let navigate = useNavigate()
  return <div className='nav-wrapper'>
    <div className='nav-left'>
      <h3>Leave Management System</h3>
    </div>
    <div className='nav-right'>
      
      <div className='nav-item' onClick={()=>{
        sessionStorage.clear()
        navigate('/login')
      }}>Logout</div>

      <div className='nav-item' onClick={()=>{
        role==='admin'?navigate('/admin-dashboard'):navigate('/user-dashboard')
      }}>Dashboard</div>

      {role==='employee'?<div className='nav-item' onClick={()=>navigate('/apply-leave')}>Apply Leave</div>:<></>}
    </div>
  </div>
}

export default NavBar