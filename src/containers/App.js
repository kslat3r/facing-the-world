import React from 'react';
import Amplify from 'aws-amplify';
import awsmobile from '../aws-exports';
import { withAuthenticator } from 'aws-amplify-react'; // or 'aws-amplify-react-native';

Amplify.configure(awsmobile);

function App() {
  return (
    <h1>App</h1>
  );
}

export default withAuthenticator(App, true);
