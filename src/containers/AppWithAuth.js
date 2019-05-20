import React from 'react';
import { Authenticator, SignIn, Greetings } from 'aws-amplify-react';
import CustomSignIn from '../components/CustomSignIn';
import Patients from './App';

const AppWithAuth = () => {
  return (
    <Authenticator
      hide={[SignIn, Greetings]}
    >
      <CustomSignIn />
      <Patients />
    </Authenticator>
  );
}

export default AppWithAuth;
