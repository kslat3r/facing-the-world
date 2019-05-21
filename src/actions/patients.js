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

export const list = (contains = null)  => async (dispatch) => {
  dispatch(loading());

  const args = {
    limit: 9999999
  };

  if (contains) {
    args.filter = {
      or: [{
        fullNameLowerCase: {
          contains: contains.toLowerCase()
        },
      },
      {
        number: {
          contains
        }
      }]
    };
  }

  let response;

  try {
    response = await API.graphql(graphqlOperation(queries.listPatients, args));
  } catch (e) {
    return dispatch(error(e));
  }

  return dispatch(success(response));
};
