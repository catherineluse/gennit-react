import React from 'react';
import { useAuth0 } from './react-auth0-spa';
import { Link } from 'react-router-dom';

import './NavBar.css';

const NavBar = () => {
  const { loading, isAuthenticated, logout } = useAuth0();

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className='navbar'>
      <ul>
        {isAuthenticated && (
          <span>
            <li>
              <Link to='/communities'>
                Communities</Link>
            </li>
            <li>
              <Link to='/users'>
                Users</Link>
            </li>
            <li>
              <Link to='/todos' style={{ marginRight: 10 }}>
                Todos
              </Link>
            </li>
            <li>
              <Link to='/profile' style={{ marginRight: 10 }}>
                Profile
              </Link>
            </li>
            <li style={{ float: 'right' }}>
              <Link
                to='logout'
                onClick={() =>
                  logout({ returnTo: global.window.location.href })
                }
              >
                Log out
              </Link>
            </li>
          </span>
        )}
      </ul>
    </div>
  );
};

export default NavBar;
