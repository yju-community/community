import React, { memo, useState, useCallback, useEffect } from 'react';
import Router from 'next/router';
import { useSelector, useDispatch } from 'react-redux';

import { UPDATE_MY_INFO_REQUEST } from '../../reducers/user';

// 이름(notnull) 성별(notnull) 프로필사진(notnull, 디폴트 성별로)

const NameForm = memo(() => {
  const [userName, setUserName] = useState('');
  const { me, updateMyInfoLoading } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  useEffect(() => {
    if((me.nickname && me.gender)) {
      Router.push('/');
    }
  }, [me]);

  const onChangeUserName = useCallback((e) => {
    setUserName(e.target.value);
  }, [userName]);

  const onSubmit = useCallback((e) => {
    e.preventDefault();
    if (!userName && !userName.trim()) {
      return;
    }
    dispatch({
      type: UPDATE_MY_INFO_REQUEST,
      data: { nickname: userName, gender: "1", major: 1 }
    })
  }, [userName]);

  return (
    <div
      className="flex"
    >
      <form onSubmit={onSubmit}>
        <input
          id="name"
          type="text"
          placeholder="이름을 입력하세요"
          value={userName}
          onChange={onChangeUserName}
          className="border-2 border-white rounded-xl py-2 px-3 text-center text-white placeholder-white bg-purple-600 focus:outline-none focus:placeholder-opacity-0"
        />
      </form>
      {updateMyInfoLoading && <div
        style={{ borderTopColor: 'transparent' }}
        className="w-5 h-5 mt-3 ml-2 border-4 border-white border-solid rounded-full animate-spin"
      ></div>}
    </div>
  );
});

export default NameForm;
