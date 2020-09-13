import React, { useState, useEffect } from 'react';
import { useQuery, useMutation } from '@apollo/react-hooks';

import {
    GET_USER,
    GET_USERS,
    ADD_USER,
} from './GraphQLData';
import { useAuth0 } from './react-auth0-spa';

const useImperativeQuery = (query) => {
    const { refetch } = useQuery(query, { skip: true });
    const imperativelyCallQuery = (variables) => {
        return refetch(variables);
    };
    return imperativelyCallQuery;
};
const UserList = () => {

    const [addUser] = useMutation(ADD_USER);
    const getUserData = useImperativeQuery(GET_USER);

    const { user } = useAuth0();

    const createUser = () => {
        if (user === undefined) {
            return null;
        }
        const { data: getUser } = getUserData({
            username: user.email,
        });
        if (getUser && getUser.getUser === null) {
            const newUser = {
                username: user.email,
                name: user.nickname,
            };
            addUser({
                variables: {
                    user: newUser,
                },
            });
        }
    };

    const { loading, error, data } = useQuery(GET_USERS);

    const getData = () => {
        if (loading) {
            return null;
        }
        if (error) {
            console.error(`GET_USERS error: ${error}`);
            return `Error: ${error.message}`;
        }
        if (data.queryUser) {
            setShownUsers(data.queryUser);
        }
    };

    const [shownUsers, setShownUsers] = useState([]);

    const userListItems = shownUsers.map((userData, i) => {
        return (
            <p key={i}>{JSON.stringify(userData)}</p>
        )
    });

    const main = !shownUsers.length ? null : (
        <section className='main'>
            <ul className='user-list'>{userListItems}</ul>
        </section>
    );

    useEffect(() => {

        createUser();
        getData();
    }, [user, data]); // eslint-disable-line react-hooks/exhaustive-deps

    return (
        <div>
            {main}
        </div>
    );
};

export default UserList;
