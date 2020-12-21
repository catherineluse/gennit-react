import React from 'react'
import { NavLink } from 'react-router-dom'
import { showSideNavVar } from '../cache';

const SideNav = () => {

  const toggleSideNav = () => {
    showSideNavVar(!showSideNavVar())
  }

  return (
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
  )
}

export default SideNav
