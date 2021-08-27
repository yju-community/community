import React, { memo, useCallback, useEffect } from 'react';
import Link from 'next/link';
import Router from 'next/router';
import { motion } from 'framer-motion';
import { useDispatch, useSelector } from 'react-redux';

import { LOG_OUT_REQUEST } from '../reducers/user';
import UserProfile from './UserProfile';

const menuInitial = () => ({ opacity: 0, y: -20 });
const itemInitial = () => ({ opacity: 0, y: 20 });
const animate = () => ({ opacity: 1, y: 0 });

const AppLayout = memo(({ children }) => {
  const { me } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  useEffect(() => {
    console.log('pages/index.jsx', me);
    if(!(me && me.id)) {
      Router.push('/login');
    }
  }, [me]);

  const onLogOut = useCallback(() => {
    dispatch({
      type: LOG_OUT_REQUEST,
    });
  }, []);

  return (
    <div className="container mx-auto">
      {/* menu bar */}
      <motion.div
        initial={menuInitial}
        animate={animate}
        className="relative flex space-x-8 bg-gray-50 md:mb-4 mb-2 rounded-b-xl px-4 py-3"
      >
        <Link href="/"><a
          className="hover:uppercase"
        >
          <span>user info</span>
        </a></Link>
        <Link href="/"><a>
          <span>post</span>
        </a></Link>
        <button
          className="absolute right-4"
          onClick={onLogOut}
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
          </svg>
        </button>
      </motion.div>

      {/* container */}
      <div className="grid md:grid-cols-12 grid-rows-7 md:gap-4 gap-2">
        {/* user info */}
        <motion.div
          initial={itemInitial}
          animate={animate}
          transition={{ delay: 0.2 }}
          className="md:col-span-3 row-span-1 bg-gray-50 rounded-xl p-4"
        >
          <UserProfile />
        </motion.div>

        {/* main */}
        <motion.div
          initial={itemInitial}
          animate={animate}
          transition={{ delay: 0.4 }}
          className="md:col-span-9 row-span-6 bg-gray-50 rounded-xl p-4"
        >
          { children }
        </motion.div>
      </div>
    </div>
  );
});

export default AppLayout;