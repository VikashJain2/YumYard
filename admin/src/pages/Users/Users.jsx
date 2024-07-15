import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import './Users.css'
const Users = ({url}) => {
    const [user,setUser] = useState([])
    const [openEdit,setOpenEdit] = useState(false)

    const fetchUsers = async()=>{
        const response = await axios.get(url+"/api/user/get-users")
        if(response.data.success){
            setUser(response.data.data)
        }
        else{
            toast.error(response.data.message)
        }
    }

    useEffect(()=>{
        fetchUsers()
    },[fetchUsers])

    const removeUser = async(userId)=>{
        const response = await axios.post(url+"/api/user/remove",{id:userId})
        await fetchUsers()
        if(response.data.success){
            toast.success(response.data.message)
        }else{
            toast.error(response.data.message)
        }
    }

    const changeUserStatus = async(e,id)=>{
      console.log(e.target.value);
      const response = await axios.post(url+"/api/user/status",{id,status:e.target.value})
      setOpenEdit(false)
      if(response.data.success){
       await fetchUsers()
       
      }
      else{
        toast.error(response.data.message)
      }
    }
  return (
    <div className='list add flex-col'>
      <p>All Users List</p>
      <div className="list-table">
        <div className="user-list-table-format title">
          <b>UsersId</b><b>Users Name</b><b>Users Email</b><b>Status</b><b>Action</b>
        </div>
        {user.map((item,index)=>{
            return (
              <div className="user-list-table-format" key={index}>
                <p>{item._id}</p>
                <p>{item.name}</p>
                <p>{item.email}</p>
                {
                  openEdit? 
                  <select onChange={(e)=>changeUserStatus(e,item._id)} value={item.status}>
                    <option value="user">user</option>
                    <option value="admin">admin</option>
                  </select>
                  :<span>{item.status}</span>
                }
                
                <div>
                <p className='cursor' onClick={()=>removeUser(item._id)}>X</p>
                <p className='cursor' onClick={()=>setOpenEdit(true)}>&#x270E;</p>
                </div>
                
                
                
                
              </div>
            )
        })}
      </div>
    </div>
  )
}

export default Users
