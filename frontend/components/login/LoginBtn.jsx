import React, { memo, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { backUrl } from '../../config/config';

import { LOG_IN_REQUEST } from '../../reducers/user';

const LoginBtn = memo(() => {
  // const dispatch = useDispatch();
  const { logInLoading } = useSelector((state) => state.user);

  const onLogin = useCallback(() => {
    // dispatch({
    //   type: LOG_IN_REQUEST,
    // });
    window.location.href = `${backUrl}/auth/google`;
  }, []);

  return (
    <>
      <div className="mx-auto text-center space-y-8">
        <h1 className="text-3xl text-white font-bold">YJU COMMU</h1>
        <h1 className="text-2xl text-white">구글계정 로그인</h1>
        <button
          className="mx-auto flex space-x-3 py-3 px-8 border-2 bg-white rounded-lg"
          onClick={onLogin}
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
          </svg>
          <span>Sign in with Google</span>
          {logInLoading && <div
            style={{ borderTopColor: 'transparent' }}
            className="w-4 h-4 mt-1 border-2 border-white border-solid rounded-full animate-spin"
          ></div>}
        </button>
        <p className="text-white">영진에서 배포된 구글 이메일로만 로그인 할 수 있습니다!</p>
      </div>
    </>
  )
});

export default LoginBtn;
