import * as PatientsActions from '../actions/patients';

const initialState = {
  items: [],
  nextToken: null,
  loading: false,
  error: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case PatientsActions.PATIENTS_LOADING:
      return {
        items: state.items,
        loading: true,
        error: null
      };

    case PatientsActions.PATIENTS_SUCCESS:
      return {
        items: state.items.concat(action.response.data.listPatients.items),
        nextToken: action.response.data.listPatients.nextToken,
        loading: false,
        error: null
      };

    case PatientsActions.PATIENTS_ERROR:
      return {
        items: [],
        loading: false,
        error: action.error
      };

    default:
      return state;
  }
}
