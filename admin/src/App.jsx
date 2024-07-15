import React from 'react'
import Navbar from './components/Navbar/Navbar'
import SideBar from './components/SideBar/SideBar'
import {Routes,Route} from 'react-router-dom'
import Add from './pages/Add/Add'
import List from './pages/List/List'
import Orders from './pages/Orders/Orders'
import { ToastContainer} from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';
import Category from './pages/Category/Category'
import ListCategories from './pages/ListCategories/ListCategories'
import Users from './pages/Users/Users'
import Login from './components/Login/Login'
import { useState } from 'react'
const App = () => {
  const url = "https://yumyard-backend-xll3.onrender.com"
  const [showLogin,setShowLogin] = useState(true)
  return (
    <>
    {showLogin ? <Login setShowLogin={setShowLogin} url={url}/> : <></>}
    <div>
      <ToastContainer/>
      <Navbar setShowLogin={setShowLogin}/>
      <hr />
      <div className="app-content">
        <SideBar/>
        <Routes>
          <Route path='/add' element={<Add url={url}/>}/>
          <Route path="/list" element={<List url={url}/>}/>
          <Route path='/orders' element={<Orders url={url}/>}/>
          <Route path='/category' element={<Category url={url}/>}/>
          <Route path='/category-list' element={<ListCategories url={url}/>}/>
          <Route path='/users' element={<Users url={url}/>}/>
          <Route path="/login-admin" element={<Login/>}/>
        </Routes>
      </div>
    </div>
    </>
  )
}

export default App
