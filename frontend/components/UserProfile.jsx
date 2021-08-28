import React from 'react';
import { useSelector } from 'react-redux';

const UserProfile = () => {
  const { me } = useSelector((state) => state.user);

  return (
    <div
      className="flex"
    >
      <img
        src={me && me.profileImage?.src}
        className="w-12 h-12 rounded-full mr-4"
      />
      <div>
        <p
          className="text-xl"
        >{me && me.nickname}</p>
        <p className="text-sm text-gray-500">{me && me.email}</p>
      </div>
    </div>
  );
}

export default UserProfile;