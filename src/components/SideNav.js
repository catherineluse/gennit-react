import React from 'react'
import { Link } from 'react-router-dom'
import { useDispatch } from 'react-redux'

const SideNav = () => {
  const dispatch = useDispatch()

  const toggleSideNav = () => {
    dispatch({
      type: 'TOGGLE_SIDE_NAV'
    })
  }

  return (
    <div className='sidenav'>
      <span className='closeButtonInSideNav' onClick={toggleSideNav}>
        &times;
      </span>
      <div className='sideNavItems'>
        <Link to='/communities' className='sideNavItem'>
          <li>
            <i className='fas fa-users'></i> Communities
          </li>
        </Link>
        <Link to='/users'>
          <li className='sideNavItem'>
            <i className='fas fa-id-card'></i> Users
          </li>
        </Link>
      </div>
    </div>
  )
}

export default SideNav
