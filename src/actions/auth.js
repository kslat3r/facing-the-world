import { Auth } from 'aws-amplify';

export const AUTH_ERROR = 'AUTH_ERROR';
export const AUTH_SUCCESS = 'AUTH_SUCCESS';

const error = error => {
  return {
    type: AUTH_ERROR,
    error
  };
};

const success = user => {
  return {
    type: AUTH_SUCCESS,
    user
  };
}

export const initialise = ()  => async (dispatch) => {
  let user;

  try {
    user = await Auth.currentAuthenticatedUser();
  } catch (e) {
    console.log(e);

    return;
  }

  return dispatch(success(user));
}

export const login = (username, password) => async (dispatch) => {
  let user;

  try {
    user = await Auth.signIn(username, password)
  } catch (e) {
    return dispatch(error(e));
  }

  return dispatch(success(user));
}
