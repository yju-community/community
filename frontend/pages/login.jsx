import React from 'react';
import Head from 'next/head';
import { useSelector } from 'react-redux';

import LoginBtn from '../components/login/LoginBtn';
import InfoForm from '../components/login/InfoForm';

const Login = () => {
  const me = useSelector((state) => state.user?.me);

  return (
    <div
      className="grid justify-center content-center h-screen"
    >
      <Head>
        <title>로그인 | MoYung</title>
      </Head>

      {me && me.id ? <InfoForm /> : <LoginBtn />}
    </div>
  );
}

export default Login;