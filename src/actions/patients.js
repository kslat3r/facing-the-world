import { API, graphqlOperation } from 'aws-amplify';
import * as queries from '../graphql/queries';
import * as subscriptions from '../graphql/subscriptions';

export const PATIENTS_INITIALISED = 'PATIENTS_INITIALISED';
export const PATIENTS_ADDED = 'PATIENTS_ADDED';
export const PATIENTS_UPDATED = 'PATIENTS_UPDATED';
export const PATIENTS_REMOVED = 'PATIENTS_REMOVED';
export const PATIENTS_LOADING = 'PATIENTS_LOADNG';
export const PATIENTS_ERROR = 'PATIENTS_ERROR';
export const PATIENTS_SUCCESS = 'PATIENTS_SUCCESS';
export const PATIENTS_SEARCH_TERM = 'PATIENTS_SEARCH_TERM';

const initialised = () => {
  return {
    type: PATIENTS_INITIALISED
  };
}

const added = (item) => {
  return {
    type: PATIENTS_ADDED,
    item
  };
}

const updated = (item) => {
  return {
    type: PATIENTS_UPDATED,
    item
  };
}

const removed = (item) => {
  return {
    type: PATIENTS_REMOVED,
    item
  };
}

const searchTerm = (searchTerm) => {
  return {
    type: PATIENTS_SEARCH_TERM,
    searchTerm
  };
};


export const initialise = () => async (dispatch) => {
  dispatch(initialised());

  API.graphql(graphqlOperation(subscriptions.onCreatePatient))
    .subscribe({
      next: (data) => dispatch(added(data))
    });

  API.graphql(graphqlOperation(subscriptions.onUpdatePatient))
    .subscribe({
      next: (data) => dispatch(updated(data))
    });

  API.graphql(graphqlOperation(subscriptions.onDeletePatient))
    .subscribe({
      next: (data) => dispatch(removed(data))
    });
}

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

export const list = (contains = null) => async (dispatch) => {
  dispatch(loading());

  const args = {
    limit: 9999999
  };

  if (contains) {
    dispatch(searchTerm(contains));

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
  } else {
    console.log(true);
    dispatch(searchTerm(''));
  }

  let response;

  try {
    response = await API.graphql(graphqlOperation(queries.listPatients, args));
  } catch (e) {
    return dispatch(error(e));
  }

  return dispatch(success(response));
};
