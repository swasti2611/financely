import React from 'react'
 import '../Header/styles.css'
const Header = () => {
    function logout(){
        alert("hello")
    }
  return (
    <div className="navbar">
     <p className="navbar-heading">Financly.</p>
     <p className="navbar-link" onClick={logout}>
         
          Logout
        </p>
    </div>
  )
}

export default Header
