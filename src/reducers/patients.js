import * as PatientsActions from '../actions/patients';

const initialState = {
  items: [],
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
      const items = action.response.data.listPatients.items;

      items.sort((a, b) => {
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

      return {
        items,
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
