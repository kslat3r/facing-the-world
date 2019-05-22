import { Storage, API, graphqlOperation } from 'aws-amplify';
import * as uuid from 'uuid';
import * as queries from '../graphql/queries';
import * as mutations from '../graphql/mutations';

export const PATIENT_LOADING = 'PATIENT_LOADNG';
export const PATIENT_UPLOADING = 'PATIENT_UPLOADING';
export const PATIENT_UPLOADED = 'PATIENT_UPLOADED';
export const PATIENT_SUBMITTING = 'PATIENT_SUBMITTING';
export const PATIENT_REMOVING = 'PATIENT_REMOVING';
export const PATIENT_ERROR = 'PATIENT_ERROR';
export const PATIENT_SUCCESS = 'PATIENT_SUCCESS';
export const PATIENT_RESET = 'PATIENT_RESET';

const loading = () => {
  return {
    type: PATIENT_LOADING
  };
};

const uploading = () => {
  return {
    type: PATIENT_UPLOADING
  };
};

const uploaded = (photoKey) => {
  return {
    type: PATIENT_UPLOADED,
    photoKey
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

export const reset = ()  => (dispatch) => {
  dispatch({
    type: PATIENT_RESET
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

export const upload = (file)  => async (dispatch) => {
  dispatch(uploading());

  const name = `${uuid.v4()}.${file.name.split('.')[1]}`;

  try {
    await Storage.vault.put(name, file);
  } catch (e) {
    return dispatch(error(e));
  }

  return dispatch(uploaded(name));
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

  data.fullNameLowerCase = `${data.firstName.toLowerCase()} ${data.lastName.toLowerCase()}`;

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

