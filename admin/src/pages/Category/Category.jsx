import React from 'react'
// import "./Add.css";
import { assets } from "../../assets/assets";
import axios from "axios";
import { toast } from "react-toastify";
import { useState } from 'react';
const Category = ({url}) => {
    const [image, setImage] = useState(false);
    const [data, setData] = useState({
      menu_name:"",
    });
  
    const onChangeHandler = (e) => {
      const name = e.target.name;
      const value = e.target.value;
      setData((data) => ({ ...data, [name]: value }));
      console.log(data);
    };
  
    const onSubmitHandler = async (e) => {
      e.preventDefault();
  
      const formData = new FormData();
      formData.append("menu_name", data.menu_name);
      formData.append("menu_image", image);
  

      const response = await axios.post(url+"/api/category/add",formData)
      if(response.data.success){
        setData({
            menu_name:""
        })
        setImage(false)

        toast.success(response.data.message)
      }else{
        toast.error(response.data.message)
      }
      
    //   const response = await axios.post(`${url}/api/food/add`, formData);
    //   if (response.data.success) {
    //     setData({
    //       name: "",
    //       description: "",
    //       price: "",
    //       category: "Salad",
    //     });
    //     setImage(false);
    //     toast.success(response.data.message);
    //   } else {
    //     toast.error(response.data.message);
    //   }
    };
  return (
    <div className="add">
    <form className="flex-col" onSubmit={onSubmitHandler}>
      <div className="add-img-upload flex-col">
        <p>Upload Image</p>
        <label htmlFor="image">
          <img
            src={image ? URL.createObjectURL(image) : assets.upload_area}
            alt=""
          />
        </label>
        <input
          type="file"
          onChange={(e) => setImage(e.target.files[0])}
          id="image"
          hidden
          required
        />
      </div>
      <div className="add-product-name flex-col">
        <p>Category Name</p>
        <input
          onChange={onChangeHandler}
          value={data.menu_name}
          type="text"
          name="menu_name"
          placeholder="Type here"
        />
      </div>

      

      <button type="submit" className="add-btn">
        Add
      </button>
    </form>
  </div>
  )
}

export default Category
