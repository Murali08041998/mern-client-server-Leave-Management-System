import React,{useEffect,useState} from 'react'
import NavBar from './NavBar'
import Table from 'react-bootstrap/Table';
import LmsApiService from '../api';
import Button from 'react-bootstrap/Button';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

function UserDashboard() {

  let [leaves,setLeaves] = useState([])
  let navigate = useNavigate()
  let getData = async()=>{
    try {
      let userid = sessionStorage.getItem('userid')
      let res = await LmsApiService.get(`/users-leaves/${userid}`)
      if(res.status===200){
        setLeaves(res.data.leaves)
      }
      
    } catch (error) {
      console.log(error)
      toast.error(error.response.data.message)
      if(error.response.status===401)
      {
        sessionStorage.clear()
        navigate('/login') 
      }
    }
  }
  useEffect(()=>{
    if(sessionStorage.getItem('token'))
     getData()
    else
    {
      sessionStorage.clear()
      navigate('/login')
    }
 },[])

  let handleCancelLeave = async(id)=>{
    try {
      let res = await LmsApiService.put(`/cancel-leave/${id}`)
      if(res.status===200)
      {
        toast.success(res.data.message)
        getData()
      }
    } catch (error) {
      console.log(error)
      toast.error(error.response.data.message)
      if(error.response.status===401)
      {
        sessionStorage.clear()
        navigate('/login') 
      }
    }
  }
  return <div>
    <NavBar/>
    <div className='container-fluid'>
    <Table striped bordered hover>
      <thead>
        <tr>
          <th>#</th>
          <th>Type</th>
          <th>From</th>
          <th>To</th>
          <th>No of Days</th>
          <th>Reason</th>
          <th>Status</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
       {
          leaves.map((e,i)=>{
            return <tr key={e._id}>
                <td onClick={()=>navigate(`/leave/${e._id}`)} style={{"cursor":"pointer"}}>{i+1}</td>
                <td onClick={()=>navigate(`/leave/${e._id}`)} style={{"cursor":"pointer"}}>{e.type}</td>
                <td onClick={()=>navigate(`/leave/${e._id}`)} style={{"cursor":"pointer"}}>{e.fromDate}</td>
                <td onClick={()=>navigate(`/leave/${e._id}`)} style={{"cursor":"pointer"}}>{e.toDate}</td>
                <td onClick={()=>navigate(`/leave/${e._id}`)} style={{"cursor":"pointer"}}>{e.noofdays}</td>
                <td onClick={()=>navigate(`/leave/${e._id}`)} style={{"cursor":"pointer", "textOverflow":"ellipsis"}}>{e.reason}</td>
                <td onClick={()=>navigate(`/leave/${e._id}`)} style={{"cursor":"pointer"}}>{e.status}</td>
                <td><Button variant='danger' onClick={()=>handleCancelLeave(e._id)} style={{"cursor":"pointer"}}>Cancel</Button></td>
            </tr>
          })
       }
      </tbody>
    </Table>
    </div>
  </div>
}

export default UserDashboard