import React from 'react'
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import LmsApiService from '../api';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

function Login() {
  let [email,setEmail] = useState("")
  let [password,setPassword] = useState("")
  let navigate = useNavigate()
  let handleLogin = async()=>{
    try {
      let res = await LmsApiService.post('users/login',{email,password})
      if(res.status===200)
      {
        sessionStorage.setItem('token',res.data.token)
        sessionStorage.setItem('userid',res.data.userid)
        sessionStorage.setItem('role',res.data.role)
        toast.success(res.data.message)

        if(res.data.role==='admin')
          navigate('/admin-dashboard')
        else
          navigate('/user-dashboard')
      }
    } catch (error) {
      console.log(error)
      toast.error(error.response.data.message)
    }
  }

  return <div className='container' style={{'backgroundColor':'red'}}>
    <h2 className='text-center'>Login Here!</h2>
    <Form>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Email address</Form.Label>
        <Form.Control type="email" placeholder="Enter email" onChange={(e)=>setEmail(e.target.value)}/>
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control type="password" placeholder="Password" onChange={(e)=>setPassword(e.target.value)}/>
      </Form.Group>
      <Button variant="primary" onClick={()=>handleLogin()}>
        Submit
      </Button>
    </Form>
  </div>
}

export default Login