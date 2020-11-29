import React from 'react';
import { useQuery } from '@apollo/client';
import { Link } from 'react-router-dom';
import { GET_USERS } from '../graphQLData/users';

const UserList = () => {

    const { loading, error, data } = useQuery(GET_USERS);

    if (loading) {
        return <p>Loading...</p>;
    }

    if (error) {
        return <p>{`GET_USERS error: ${error}`}</p>;
    }

    const userListItems = data.queryUser.map((userData, i) => {
        const { username, name } = userData

        return (
            <tr key={i}>
                <td><Link to={`/u/${username}`}>{username}</Link></td>
                <td>{name ? name : "null"}</td>
            </tr >
        )
    });

    return (
        <div className="container">
          <h1>Users</h1>
          <table className="table">
            <thead>
                <tr>
                    <th scope="col">Username</th>
                    <th scope="col">Name</th>
                </tr>
            </thead>
            <tbody>
              {userListItems}
            </tbody>
        </table>
        </div>
    );
};

export default UserList;