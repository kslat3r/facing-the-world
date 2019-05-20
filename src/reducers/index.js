
import { combineReducers } from 'redux';
import patientReducer from './patient';
import patientsReducer from './patients';

export default combineReducers({
  patient: patientReducer,
  patients: patientsReducer
});
