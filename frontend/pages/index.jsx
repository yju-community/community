import React from 'react';
import { useSelector } from 'react-redux';

import AppLayout from '../components/AppLayout';

const Home = () => {
  const { me } = useSelector((state) => state.user);

  return (
    <AppLayout>
      <div
        className="text-4xl"
      >
        Hello {me.name}!
      </div>
      <p>main post here Lorem ipsum dolor sit amet consectetur adipisicing elit. Necessitatibus placeat ipsam, sint, veniam incidunt officiis obcaecati adipisci reiciendis ad praesentium veritatis at non illo voluptas quibusdam fugit tempore debitis sit.</p>
    </AppLayout>
  );
}

export default Home;
