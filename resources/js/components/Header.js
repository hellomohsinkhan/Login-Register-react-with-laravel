import React from 'react'
import { Link,Route } from 'react-router-dom'

 
const Header = () => {

  const handleLogOut = () =>  {
        localStorage.clear();
        window.location.href = '/';
  }

  return(
    <nav className="navbar navbar-expand-sm bg-dark navbar-dark">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/category">Logo</Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#collapsibleNavbar">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="collapsibleNavbar">
          <ul className="navbar-nav">
            <li className="nav-item">
               <Link className="nav-link" to="/category">Category</Link>
            </li>
          </ul>        
        </div>
        <button className="d-flex" onClick={handleLogOut}>Logout</button>
      </div>
    </nav>
  )
}

export default Header

