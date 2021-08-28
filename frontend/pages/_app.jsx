import React from 'react';
import Head from 'next/head';
import 'tailwindcss/tailwind.css';
import '../styles/globals.css';

import wrapper from '../store/configureStore';

const App = ({ Component }) => (
  <div className="bg-purple-600 min-h-screen">
    <Head>
      <meta charSet="UTF-8" />
      <title>MoYung</title>
    </Head>
    <Component/>
  </div>
);

export default wrapper.withRedux(App);