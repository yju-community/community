import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { END } from 'redux-saga';
import axios from 'axios';
import router from 'next/router';

import AppLayout from '../components/AppLayout';
import { LOAD_MY_INFO_REQUEST } from '../reducers/user';
import wrapper from '../store/configureStore';

const Home = () => {
  const { me } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  useEffect(() => {
    console.log(me);
    // dispatch({
    //   type: LOAD_MY_INFO_REQUEST,
    // });
    // if(!me.nickname || !me.gender) {
    //   router.push('/login');
    // }
  }, []);

  return (
    <AppLayout>
      <div
        className="text-4xl"
      >
        Hello {me && me.name}!
      </div>
      <p>main post here Lorem ipsum dolor sit amet consectetur adipisicing elit. Necessitatibus placeat ipsam, sint, veniam incidunt officiis obcaecati adipisci reiciendis ad praesentium veritatis at non illo voluptas quibusdam fugit tempore debitis sit.</p>
    </AppLayout>
  );
}

export const getServerSideProps = wrapper.getServerSideProps((store) => async (context) => {
  const cookie = context.req ? context.req.headers.cookie : '';
  axios.defaults.headers.Cookie = '';
  if (context.req && cookie) {
    axios.defaults.headers.Cookie = cookie;
  }
  store.dispatch({
    type: LOAD_MY_INFO_REQUEST,
  });
  store.dispatch(END);
  await store.sagaTask.toPromise();
  // console.log('server side', context.req.headers)
});

export default Home;
