import React from 'react'
import './Navbar.css'
import {assets} from '../../assets/assets'
const Navbar = ({setShowLogin}) => {
  const logout = ()=>{
    localStorage.removeItem("token")
    setShowLogin(true)
  }
  return (
    <div className='navbar'>
      <img src={assets.logo} alt="" className='logo'/>
      <div className="navbar-profile">
            <img src={assets.profile_icon} alt="" />
            <ul className="nav-profile-dropdown">
              
              <hr />
              <li onClick={logout}>
                <img src={assets.logout_icon} alt="" />
                <p>Logout</p>
              </li>
            </ul>
          </div>
    </div>
  )
}

export default Navbar
