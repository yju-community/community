import React, { memo, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { motion } from 'framer-motion';

import { LOG_IN_REQUEST } from '../../reducers/user';

const hidden = () => ({ opacity: 0 });
const show = () => ({ opacity: 1 });

const LoginBtn = memo(() => {
  const dispatch = useDispatch();
  const { logInLoading } = useSelector((state) => state.user);

  const onLogin = useCallback(() => {
    dispatch({
      type: LOG_IN_REQUEST,
    })
  }, []);

  return (
    <motion.button
      initial={hidden}
      animate={show}
      transition={{ delay: 0.2 }}
      onClick={onLogin}
    >
      <div
        className="flex border-2 border-white rounded-xl py-2 px-6 pr-5 text-xl text-white"
      >
        {logInLoading && <div
          style={{ borderTopColor: 'transparent' }}
          className="w-5 h-5 mt-1 mr-2 border-4 border-white border-solid rounded-full animate-spin"
        ></div>}
        <span>Google Login</span>
        <svg xmlns="http://www.w3.org/2000/svg" className="ml-2 h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
        </svg>
      </div>
    </motion.button>
  )
});

export default LoginBtn;
