import React, { useState } from 'react'
import { NavLink } from 'react-router-dom'

const SideNav = ({
  showSideNav,
  setShowSideNav
}) => {

  const toggleSideNav = () => {
    setShowSideNav(!showSideNav)
  }

  return showSideNav ? (
    <div className='sidenav'>
      <span 
        className='closeButtonInSideNav' 
        onClick={toggleSideNav}>
        &times;
      </span>
      <div className='sideNavItems'>
      <NavLink
          exact={true}
          to={'/communities'}
          activeClassName="active"
      >
         <li className="sideNavItem">
          <i className='fas fa-users'></i> Communities
        </li>
      </NavLink>
      <NavLink
          exact={true}
          to={'/users'}
          activeClassName="active"
      >
         <li className='sideNavItem'>
         <i className='fas fa-id-card'></i> Users
        </li>
      </NavLink>
      </div>
    </div>
  ) : null;
}

export default SideNav
