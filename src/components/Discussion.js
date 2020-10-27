import React from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from '@apollo/react-hooks';
import { GET_DISCUSSION } from '../graphQLData/communities';

const Discussion = () => {
    const { url, discussionId } = useParams();
    return (<p>This is the discussion page.</p>)
}

export default Discussion;