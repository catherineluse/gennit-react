import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth0 } from './react-auth0-spa';

const TopNav = () => {
    const { loading, logout } = useAuth0();

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div className="topnav" id="myTopnav">
            <li>
                <Link to='/'>
                    Home
                </Link>
            </li>
            <li style={{ float: 'right' }}>
                <Link
                    to='logout'
                    onClick={() =>
                        logout({ returnTo: global.window.location.href })
                    }
                >
                    Log Out
              </Link>
            </li>
            <li style={{ float: 'right' }}>
                <Link
                    to='/profile'
                >
                    Profile
              </Link>
            </li>

        </div>
    );
};

export default TopNav;

