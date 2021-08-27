import produce from 'immer';

export const initialState = {
  me: {},

  logInLoading: false,
  logInDone: false,
  logInError: null,

  logOutLoading: false,
  logOutDone: false,
  logOutError: null,

  updateMyInfoLoading: false,
  updateMyInfoDone: false,
  updateMyInfoError: null,
}

const dummyMe = () => ({
  id: 1,
  email: 'lizill@naver.com',
  name: null,
  gender: null,
  Image: {
    id: 1,
    src: 'https://hatrabbits.com/wp-content/uploads/2017/01/random.jpg',
  },
});

export const LOG_IN_REQUEST = 'LOG_IN_REQUEST';
export const LOG_IN_SUCCESS = 'LOG_IN_SUCCESS';
export const LOG_IN_FAILURE = 'LOG_IN_FAILURE';

export const LOG_OUT_REQUEST = 'LOG_OUT_REQUEST';
export const LOG_OUT_SUCCESS = 'LOG_OUT_SUCCESS';
export const LOG_OUT_FAILURE = 'LOG_OUT_FAILURE';

export const UPDATE_MY_INFO_REQUEST = 'UPDATE_MY_INFO_REQUEST';
export const UPDATE_MY_INFO_SUCCESS = 'UPDATE_MY_INFO_SUCCESS';
export const UPDATE_MY_INFO_FAILURE = 'UPDATE_MY_INFO_FAILURE';

const reducer = (state = initialState, action) => produce(state, (draft) => {
  switch (action.type) {
    case LOG_IN_REQUEST:
      draft.logInLoading = true;
      draft.logInDone = false;
      draft.logInError = null;
      break;
    case LOG_IN_SUCCESS:
      draft.logInLoading = false;
      draft.logInDone = true;
      draft.me = dummyMe();
      break;
    case LOG_IN_FAILURE:
      draft.logInLoading = false;
      draft.logInError = action.error;
      break;

    case LOG_OUT_REQUEST:
      draft.logOutLoading = true;
      draft.logOutDone = false;
      draft.logOutError = null;
      break;
    case LOG_OUT_SUCCESS:
      draft.logOutLoading = false;
      draft.logOutDone = true;
      draft.me = {};
      break;
    case LOG_OUT_FAILURE:
      draft.logOutLoading = false;
      draft.logOutError = action.error;
      break;

    case UPDATE_MY_INFO_REQUEST:
      draft.updateMyInfoLoading = true;
      draft.updateMyInfoDone = false;
      draft.updateMyInfoError = null;
      break;
    case UPDATE_MY_INFO_SUCCESS:
      draft.updateMyInfoLoading = false;
      draft.updateMyInfoDone = true;
      draft.me = {...draft.me, name: action.data.name};
      break;
    case UPDATE_MY_INFO_FAILURE:
      draft.updateMyInfoLoading = false;
      draft.updateMyInfoError = action.error;
      break;
      
    default:
      break;
  }
});

export default reducer;
