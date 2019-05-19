import * as AuthActions from '../actions/auth';

const initialState = {
  user: null,
  error: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case AuthActions.AUTH_SUCCESS:
      return {
        user: action.user,
        error: null
      };

    case AuthActions.AUTH_ERROR:
      return {
        user: null,
        error: action.error
      };

    default:
      return state;
  }
}
