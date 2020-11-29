import { useQuery, useMutation } from '@apollo/client';
import React, { useState } from 'react';
import {
    GET_USER,
    GET_USERS,
    ADD_USER,
} from '../graphQLData/users';
import { useAuth0 } from '../Auth0Provider';

const imperativeGetUserQuery = () => {
    const { refetch } = useQuery(GET_USER, { skip: true });
    const imperativelyCallQuery = (variables) => {
        return refetch(variables);
    };
    return imperativelyCallQuery;
};

const getOrCreateUser = () => {
    const [addUser, { error }] = useMutation(ADD_USER);
    const [result, setResult] = useState("")
    const getUserData = imperativeGetUserQuery();
    const { user } = useAuth0();

    if (user === undefined) {
        return <p>User not authenticated.</p>;
    }

    const { data: userData } = getUserData({
        username: user.email,
    });
    
    if (userData && userData.getUser === null) {
        // If the user is authenticated with Auth0,
        // but does not exist in the database,
        // create the user in the database.
        const newUser = {
            username: user.email,
            name: user.nickname,
        };
        addUser({
            variables: {
                user: newUser,
            },
        });

        if (error) {
           setResult("Could not create the user in the database.")
        }
        setResult("Added user: " + JSON.stringify(newUser))
    }

    return (
        <p>{result}</p>
    )
}

export default getOrCreateUser