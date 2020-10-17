import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth0 } from '../react-auth0-spa';

const SideNav = () => {
    const { loading } = useAuth0();

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div className="sidenav">
            <li>
                <Link
                    to='/communities'
                >
                    Communities
              </Link>
            </li>
            <li>
                <Link
                    to='/users'
                >
                    Users
              </Link>
            </li>
        </div>
    );
};

export default SideNav;

