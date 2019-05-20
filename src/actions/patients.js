import { API, graphqlOperation } from 'aws-amplify';
import * as queries from '../graphql/queries';

export const PATIENTS_LOADING = 'PATIENTS_LOADNG';
export const PATIENTS_ERROR = 'PATIENTS_ERROR';
export const PATIENTS_SUCCESS = 'PATIENTS_SUCCESS';

const loading = () => {
  return {
    type: PATIENTS_LOADING
  };
}

const error = error => {
  return {
    type: PATIENTS_ERROR,
    error
  };
};

const success = response => {
  return {
    type: PATIENTS_SUCCESS,
    response
  };
}

export const list = ()  => async (dispatch) => {
  dispatch(loading());

  let response;

  try {
    response = await API.graphql(graphqlOperation(queries.listPatients));
  } catch (e) {
    return dispatch(error(e));
  }

  return dispatch(success(response));
}
