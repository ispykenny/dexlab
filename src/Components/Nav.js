import React from 'react';
import logo from '../images/logo.png'
const Nav = () => {
  return (
    <header>
      <div className="inner flex align-items jc-sb">
        <a href="" id="site-name">
          CODA
        </a>
        <nav>
          <button className="menu">
            <span></span>
            <span></span>
            <span></span>
          </button>
        </nav>
      </div>
    </header>
  )
}

export default Nav;