import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { useAuth0 } from '../Auth0Provider'

const TopNav = () => {
  const showSideNav = useSelector(state => state.sideNav)
  const dispatch = useDispatch()
  const { loading, logout } = useAuth0()

  const toggleSideNav = () => {
    console.log('toggle side nav ran ')
    dispatch({
      type: 'TOGGLE_SIDE_NAV'
    })
  }

  return loading ? (
    <>'Loading...'</>
  ) : (
    <div className='topnav'>
      <div className='toggleSideNavButton' onClick={toggleSideNav}>
        <i className='fas fa-bars'></i>
      </div>
      <div className='site-logo'>
        <span className='fa-stack fa-lg'>
          <i className='fa fa-circle fa-stack-2x icon-background'></i>
          <i className='fas fa-seedling fa-stack-1x logo'></i>
        </span>
      </div>
      <div className='sitename'>gennit</div>
      <ul className={`${showSideNav ? 'movedToTheLeft' : ''}`} id='myTopnav'>
        <li>
          <Link to='/'>Home</Link>
        </li>
        <li style={{ float: 'right' }}>
          <Link
            to='logout'
            onClick={() => logout({ returnTo: global.window.location.href })}
          >
            <i className='fas fa-sign-out-alt'></i> Log Out
          </Link>
        </li>
        <li style={{ float: 'right' }}>
          <Link to='/profile'>
            <i className='fas fa-user-circle'></i> Profile
          </Link>
        </li>
      </ul>
    </div>
  )
}

export default TopNav
