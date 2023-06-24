import React, { useState } from 'react'
import "./NavbarStyle.css"
import {Link} from "react-router-dom"
import jwt_decode from "jwt-decode"
import {useNavigate} from "react-router-dom"



const Navbar = () => {
    let token = null
    token = localStorage.getItem("token")
    const navigate = useNavigate()
    if(token){
        try {
                let decoded = jwt_decode(token);
            } catch (error) {
                localStorage.removeItem("token");
                navigate("/login");
            }
    }

    const [showNavbar,setShowNavbar] = useState(false)
    const handleShowNavbar = () => {
        setShowNavbar(!showNavbar)  
      }

      const logout = () => {
        const confirmation = window.confirm("Are you sure, you want to log out?")
        if(confirmation){
            localStorage.removeItem("token")
            navigate("/signup")
        }else{
            return;
        }
        
      }


  return (
    <div id='123'>
        <nav className="navbar">
        <div className="brand-name">brand Name</div>
        <div className="navbar-toggle" onClick={handleShowNavbar}>
                <span className="bar"></span>
                <span className="bar"></span>
                <span className="bar"></span>
        </div>
        <div className={`navbar-items  ${showNavbar && 'active'}`}>
            {token?(
            <>
                <ul>
                    <li><Link to="/">Home</Link></li>
                    <li><Link to="/wishlist">WishList</Link></li>
                    <li><Link onClick={logout} to="/signup">logout</Link></li>
                </ul>
            </>
            ):(
            <>
                <ul>
                    <li><Link to="/">Home</Link></li>
                    <li><Link to="/login">login</Link></li>
                    <li><Link to="/signup">singUp</Link></li>
                </ul>
            </>
            )}
            
        </div>
        <div className={`navbar-search  ${showNavbar && 'active'}`}>
            <input type="search" placeholder='search' />
            <button><span>Search</span></button>
        </div>
    </nav>
    </div>
  )
}

export default Navbar;