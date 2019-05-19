
import { combineReducers } from 'redux';
import authReducer from './auth';
import patientReducer from './patient';
import patientsReducer from './patients';

export default combineReducers({
  authReducer,
  patientReducer,
  patientsReducer
});
