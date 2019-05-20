import * as PatientActions from '../actions/patient';

const initialState = {
  item: null,
  loading: false,
  submitting: false,
  error: null
};

export default (state = initialState, action) => {
  switch (action.type) {
    case PatientActions.PATIENT_LOADING:
      return {
        item: null,
        loading: true,
        submitting: false,
        error: null
      };

    case PatientActions.PATIENT_SUBMITTING:
      return {
        item: null,
        loading: false,
        submitting: true,
        error: null
      };

    case PatientActions.PATIENT_SUCCESS:
      const item = action.response.data.getPatient || null;

      return {
        item,
        loading: false,
        submitting: false,
        error: null
      };

    case PatientActions.PATIENT_ERROR:
      return {
        item: null,
        loading: false,
        submitting: false,
        error: action.error
      };

    case PatientActions.PATIENT_INIT:
      return {
        item: {},
        loading: false,
        submitting: false,
        error: null
      };

    default:
      return state;
  }
}
