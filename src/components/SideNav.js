import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { GennitContext } from "../AppWithContext";

const SideNav = () => {

    const { state, dispatch } = useContext(GennitContext);


    const toggleSideNav = () => {
        dispatch({
            type: "TOGGLE_SIDE_NAV",
            payload: !state.showSideNav
        })
    }

    return (
        <div className="sidenav">
            <span
                className="closeButtonInSideNav"
                onClick={toggleSideNav}
            >
                &times;
            </span>
            <div className="sideNavItems">
                <Link to='/communities' className="sideNavItem">
                    <li >
                        <i className="fas fa-users"></i> Communities
                    </li>
                </Link>
                <Link to='/users'>
                    <li className="sideNavItem">
                        <i className="fas fa-id-card"></i> Users
                    </li>
                </Link>
            </div >
        </div >
    );
};

export default SideNav;

