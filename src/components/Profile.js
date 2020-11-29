import React from "react";
import { useAuth0 } from "../Auth0Provider";

const Profile = () => {
  const { loading, user } = useAuth0();

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!user) {
    return <div>User not found.</div>;
  }

  return (
    <div className="profile">
      <img className="profile-img" src={user.picture} alt="Profile" />
      <p>Name: <strong>{user.nickname}</strong></p>
      <p>Email: <strong>{user.email}</strong></p>
    </div>
  );
};

export default Profile;
