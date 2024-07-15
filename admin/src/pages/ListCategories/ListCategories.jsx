import React from 'react'
import { useState } from 'react'
import './ListCategories.css'
import axios from 'axios'
import {toast} from 'react-toastify'
import { useEffect } from 'react'
const ListCategories = ({url}) => {

    const [categoryList,setCategoryList] = useState([])

    const fetchCategoryList = async()=>{
        const response = await axios.get(url+"/api/category/list")
        if(response.data.success){

            setCategoryList(response.data.data)
        }
        else{
            toast.error(response.data.message)
        }
    }

    useEffect(()=>{
        fetchCategoryList()
    },[])

    const removeCategory = async(categoryId)=>{
        const response = await axios.post(url+"/api/category/remove",{id:categoryId})

        await fetchCategoryList()

        if(response.data.success){
            toast.success(response.data.message)
        }
        else{
            toast.error(response.data.message)
        }
    }
  return (
    <div className='list add flex-col'>
      <p>All Categories List</p>
      <div className="list-table">
        <div className="category-list-table-format title">
          <b>Image</b><b>Category Name</b><b>Action</b>
        </div>
        {categoryList.map((item,index)=>{
            return (
              <div className="category-list-table-format" key={index}>
                <img src={`${url}/images/`+item.menu_image} alt="" />
                <p>{item.menu_name}</p>
                <p className='cursor' onClick={()=>removeCategory(item._id)}>X</p>
              </div>
            )
        })}
      </div>
    </div>
  )
}

export default ListCategories
