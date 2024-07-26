import React, { useEffect, useState } from 'react';
import { getUserProfile } from '../../services/userService';

const UserProfile = () => {
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      const userProfile = await getUserProfile();
      setProfile(userProfile);
    };

    fetchProfile();
  }, []);

  if (!profile) return <p>Loading...</p>;

  return (
    <div className="profile-container">
      <h1>{profile.name}</h1>
      <img src={profile.avatar} alt="Profile Avatar" />
      <p>{profile.email}</p>
      {/* More profile details */}
    </div>
  );
};

export default UserProfile;
