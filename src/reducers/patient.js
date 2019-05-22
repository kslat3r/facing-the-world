import * as PatientActions from '../actions/patient';

const createInitialState = () => {
  return {
    item: {
      id: '',
      number: '',
      firstName: '',
      lastName: '',
      dateOfBirth: '',
      history: '',
      managementPlan: '',
      photoKey: ''
    },
    loading: false,
    uploading: false,
    submitting: false,
    removing: false,
    error: null
  };
};

export default (state = createInitialState(), action) => {
  switch (action.type) {
    case PatientActions.PATIENT_LOADING:
      return {
        item: null,
        loading: true,
        uploading: false,
        submitting: false,
        removing: false,
        error: null
      };

    case PatientActions.PATIENT_UPLOADING:
      return {
        item: state.item,
        loading: false,
        uploading: true,
        submitting: false,
        removing: false,
        error: null
      };

    case PatientActions.PATIENT_UPLOADED:
      state.item.photoKey = action.photoKey;

      return {
        item: state.item,
        loading: false,
        uploading: false,
        submitting: false,
        removing: false,
        error: null
      };

    case PatientActions.PATIENT_SUBMITTING:
      return {
        item: state.item,
        loading: false,
        uploading: false,
        submitting: true,
        removing: false,
        error: null
      };

    case PatientActions.PATIENT_REMOVING:
      return {
        item: state.item,
        loading: false,
        uploading: false,
        submitting: false,
        removing: true,
        error: null
      };

    case PatientActions.PATIENT_SUCCESS:
      let item;

      if (action.response.data.getPatient) {
        item = action.response.data.getPatient;
      } else if (action.response.data.updatePatient) {
        item = action.response.data.updatePatient;
      } else {
        item = null;
      }

      return {
        item,
        loading: false,
        uploading: false,
        submitting: false,
        removing: false,
        error: null
      };

    case PatientActions.PATIENT_ERROR:
      return {
        item: null,
        loading: false,
        uploading: false,
        submitting: false,
        removing: false,
        error: action.error
      };

    case PatientActions.PATIENT_RESET:
      return createInitialState();

    default:
      return state;
  }
}
