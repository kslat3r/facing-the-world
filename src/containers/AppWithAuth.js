import React from 'react';
import Amplify from "aws-amplify";
import awsmobile from '../aws-exports';
import { Authenticator, SignIn } from 'aws-amplify-react';
import CustomSignIn from '../components/CustomSignIn';
import Patients from './App';

Amplify.configure(awsmobile);

const AppWithAuth = () => {
  return (
    <Authenticator
      hide={[SignIn]}
    >
      <CustomSignIn />
      <Patients />
    </Authenticator>
  );
}

export default AppWithAuth;
