import { API, graphqlOperation } from 'aws-amplify';
import * as queries from '../graphql/queries';
import * as mutations from '../graphql/mutations';

export const PATIENT_LOADING = 'PATIENT_LOADNG';
export const PATIENT_SUBMITTING = 'PATIENT_SUBMITTING';
export const PATIENT_REMOVING = 'PATIENT_REMOVING';
export const PATIENT_ERROR = 'PATIENT_ERROR';
export const PATIENT_SUCCESS = 'PATIENT_SUCCESS';
export const PATIENT_INIT = 'PATIENT_INIT';

const loading = () => {
  return {
    type: PATIENT_LOADING
  };
};

const submitting = () => {
  return {
    type: PATIENT_SUBMITTING
  };
};

const removing = () => {
  return {
    type: PATIENT_REMOVING
  };
};

const error = error => {
  return {
    type: PATIENT_ERROR,
    error
  };
};

const success = response => {
  return {
    type: PATIENT_SUCCESS,
    response
  };
};

export const init = ()  => (dispatch) => {
  dispatch({
    type: PATIENT_INIT
  });
};

export const get = (id)  => async (dispatch) => {
  dispatch(loading());

  let response;

  try {
    response = await API.graphql(graphqlOperation(queries.getPatient, { id }));
  } catch (e) {
    return dispatch(error(e));
  }

  return dispatch(success(response));
};

export const create = (data)  => async (dispatch) => {
  dispatch(submitting());

  data.fullNameLowerCase = `${data.firstName.toLowerCase()} ${data.lastName.toLowerCase()}`;

  let response;

  try {
    response = await API.graphql(graphqlOperation(mutations.createPatient, { input: data }));
  } catch (e) {
    return dispatch(error(e));
  }

  return dispatch(success(response));
};

export const update = (data)  => async (dispatch) => {
  dispatch(submitting());

  data.nameLowerCase = data.name.toLowerCase();

  let response;

  try {
    response = await API.graphql(graphqlOperation(mutations.updatePatient, { input: data }));
  } catch (e) {
    return dispatch(error(e));
  }

  return dispatch(success(response));
};

export const remove = (id)  => async (dispatch) => {
  dispatch(removing());

  let response;

  try {
    response = await API.graphql(graphqlOperation(mutations.deletePatient, {
      input: {
        id
      }
    }));
  } catch (e) {
    return dispatch(error(e));
  }

  return dispatch(success(response));
};

