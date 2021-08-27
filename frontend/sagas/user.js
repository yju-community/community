import { all, fork, put, takeLatest, call, delay } from "@redux-saga/core/effects";
import axios from 'axios';

import {
  LOG_IN_REQUEST, LOG_IN_SUCCESS, LOG_IN_FAILURE,
  LOG_OUT_REQUEST, LOG_OUT_SUCCESS, LOG_OUT_FAILURE,
  UPDATE_MY_INFO_REQUEST, UPDATE_MY_INFO_SUCCESS, UPDATE_MY_INFO_FAILURE,
} from '../reducers/user';

function logInApi(data) {
  return axios.post('/user/login', data);
}
function* logIn() {
  try {
    // const result = yield call(logInApi, action.data);
    yield delay(1000);
    yield put({
      type: LOG_IN_SUCCESS,
      // data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: LOG_IN_FAILURE,
      error: err.response.data,
    });
  }
}
function* watchLogIn() {
  yield takeLatest(LOG_IN_REQUEST, logIn);
}

function logOutApi(data) {
  return axios.post('/user/logout', data);
}
function* logOut() {
  try {
    // const result = yield call(logOutApi, action.data);
    yield delay(1000);
    yield put({
      type: LOG_OUT_SUCCESS,
      // data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: LOG_OUT_FAILURE,
      error: err.response.data,
    });
  }
}
function* watchLogOut() {
  yield takeLatest(LOG_OUT_REQUEST, logOut);
}

function updateMyInfoApi(data) {
  return axios.patch('/user', data);
}
function* updateMyInfo(action) {
  try {
    // const result = yield call(updateMyInfoApi, action.data);
    yield delay(1000);
    yield put({
      type: UPDATE_MY_INFO_SUCCESS,
      // data: result.data,
      data: action.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: UPDATE_MY_INFO_FAILURE,
      error: err.response.data,
    });
  }
}
function* watchUpdateMyInfo() {
  yield takeLatest(UPDATE_MY_INFO_REQUEST, updateMyInfo);
}

export default function* userSaga() {
  yield all([
    fork(watchLogIn),
    fork(watchLogOut),
    fork(watchUpdateMyInfo),
  ]);
}