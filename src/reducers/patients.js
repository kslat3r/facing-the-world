import * as PatientsActions from '../actions/patients';

const initialState = {
  initialised: false,
  items: [],
  loading: false,
  error: null,
  searchTerm: ''
};

const sort = items => items.sort((a, b) => {
  const aLastName = a.lastName.toLowerCase();
  const bLastName = b.lastName.toLowerCase();

  if (aLastName < bLastName) {
    return -1;
  }

  if (aLastName > bLastName) {
    return 1;
  }

  return 0;
});

export default (state = initialState, action) => {
  switch (action.type) {
    case PatientsActions.PATIENTS_INITIALISED:
      return {
        initialised: true,
        items: state.items,
        loading: state.loading,
        error: state.error,
        searchTerm: state.searchTerm
      };

    case PatientsActions.PATIENTS_ADDED: {
      const item = action.item.value.data.onCreatePatient;

      state.items.unshift(item);

      return {
        initialised: true,
        items: sort(state.items),
        loading: state.loading,
        error: state.error,
        searchTerm: state.searchTerm
      };
    }

    case PatientsActions.PATIENTS_UPDATED: {
      const item = action.item.value.data.onUpdatePatient;

      state.items = state.items.filter(patient => patient.id !== item.id);
      state.items.unshift(item);

      return {
        initialised: true,
        items: sort(state.items),
        loading: state.loading,
        error: state.error,
        searchTerm: state.searchTerm
      };
    }

    case PatientsActions.PATIENTS_REMOVED: {
      const item = action.item.value.data.onDeletePatient;

      state.items = state.items.filter(patient => patient.id !== item.id);

      return {
        initialised: true,
        items: state.items,
        loading: state.loading,
        error: state.error,
        searchTerm: state.searchTerm
      };
    }

    case PatientsActions.PATIENTS_LOADING:
      return {
        initialised: state.initialised,
        items: state.items,
        loading: true,
        error: null,
        searchTerm: state.searchTerm
      };

    case PatientsActions.PATIENTS_SUCCESS:
      return {
        initialised: state.initialised,
        items: sort(action.response.data.listPatients.items),
        loading: false,
        error: null,
        searchTerm: state.searchTerm
      };

    case PatientsActions.PATIENTS_ERROR:
      return {
        initialised: state.initialised,
        items: [],
        loading: false,
        error: action.error,
        searchTerm: state.searchTerm
      };

    case PatientsActions.PATIENTS_SEARCH_TERM:
      return {
        initialised: state.initialised,
        items: state.items,
        loading: state.loading,
        error: state.error,
        searchTerm: action.searchTerm
      };

    default:
      return state;
  }
}
