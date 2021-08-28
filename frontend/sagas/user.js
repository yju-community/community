import { all, fork, put, takeLatest, call, delay } from "@redux-saga/core/effects";
import axios from 'axios';

import {
  LOG_OUT_REQUEST, LOG_OUT_SUCCESS, LOG_OUT_FAILURE,
  UPDATE_MY_INFO_REQUEST, UPDATE_MY_INFO_SUCCESS, UPDATE_MY_INFO_FAILURE,
  LOAD_MY_INFO_REQUEST, LOAD_MY_INFO_SUCCESS, LOAD_MY_INFO_FAILURE,
} from '../reducers/user';

function logOutApi(data) {
  return axios.post('/auth/logout', data);
}
function* logOut() {
  try {
    yield call(logOutApi);
    yield put({
      type: LOG_OUT_SUCCESS,
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

function loadMyInfoApi() {
  return axios.get('/auth/refresh');
}
function* loadMyInfo() {
  try {
    const result = yield call(loadMyInfoApi);
    // console.log('sagas/user/loadMyInfo', result);
    
    axios.interceptors.request.use(
      config => {
        config.headers.Authorization = result.headers.authorization;
        return config
      },
      error => {
        Promise.reject(error)
      }
    )
    yield put({
      type: LOAD_MY_INFO_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: LOAD_MY_INFO_FAILURE,
      error: err.response.data,
    });
  }
}
function* watchLoadMyInfo() {
  yield takeLatest(LOAD_MY_INFO_REQUEST, loadMyInfo);
}

function updateMyInfoApi(data) {
  return axios.patch('/users/profile', data);
}
function* updateMyInfo(action) {
  try {
    const result = yield call(updateMyInfoApi, action.data);
    yield put({
      type: UPDATE_MY_INFO_SUCCESS,
      data: result.data,
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
    fork(watchLogOut),
    fork(watchUpdateMyInfo),
    fork(watchLoadMyInfo),
  ]);
}