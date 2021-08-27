import { all, fork } from "@redux-saga/core/effects";
import axios from 'axios';

import userSaga from './user';
import postSaga from './post';

// axios.defaults.baseURL = 'http://localhost:3000';
axios.defaults.withCredentials = true;

export default function* rootSaga() {
  yield all([
    fork(userSaga),
    fork(postSaga),
  ]);
}
