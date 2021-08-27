import React from 'react';
import { useSelector } from 'react-redux';

const UserProfile = () => {
  const { me } = useSelector((state) => state.user);

  return (
    <div
      className="flex"
    >
      <img
        src={me.id && me.Image.src}
        className="w-12 h-12 rounded-full mr-4"
      />
      <div>
        <p
          className="text-xl"
        >{me.name}</p>
        <p className="text-sm text-gray-500">{me.email}</p>
      </div>
    </div>
  );
}

export default UserProfile;