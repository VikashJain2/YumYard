import React, { useEffect, useState } from "react";
import "./Login.css";
import axios from "axios"
import {toast} from 'react-toastify'
const Login = ({ url,setShowLogin }) => {
  const [data, setData] = useState({
    email: "",
    password: "",
  });

  const onChangeHandler = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setData((data) => ({ ...data, [name]: value }));
  };

  const onLogin = async(e)=>{
    e.preventDefault();

    const response = await axios.post(url+"/api/user/login-admin",data)

    if(response.data.success){
        toast.success(response.data.message)
        localStorage.setItem("token",response.data.token)
        setShowLogin(false) 
    }
    else{
        toast.error(response.data.message)
    }
  }

  useEffect(()=>{
    if(localStorage.getItem("token")){
        setShowLogin(false)
    }
  },[localStorage.getItem("token")])

//   useEffect(()=>{
//     console.log(data);
//   },[onChangeHandler])
  return (
    <div className="login-popup">
      <form action="" className="login-popup-container" onSubmit={onLogin}>
        <div className="login-popup-title">Login</div>

        <div className="login-popup-inputs">
        <input
            type="email"
            name="email"
            onChange={onChangeHandler}
            value={data.email}
            id=""
            placeholder="Your email"
            required
          />

<input
            type="password"
            name="password"
            id=""
            onChange={onChangeHandler}
            placeholder="Password"
            required
            value={data.password}
          />
        </div>

        <button className="submi">Login</button>
      </form>
    </div>
  );
};

export default Login;
