import React from 'react';
import Amplify from "aws-amplify";
import awsmobile from '../aws-exports';
import { Authenticator, SignIn, Greetings } from 'aws-amplify-react';
import CustomSignIn from '../components/CustomSignIn';
import Patients from './App';

Amplify.configure(awsmobile);
console.log(JSON.stringify(awsmobile));

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
