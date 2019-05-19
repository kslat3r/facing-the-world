import React from 'react';

const App = (props) => {
  const { authState } = props;

  if (authState !== 'signedIn') {
    return null;
  }

  return (
    <h1>App</h1>
  );
};

export default App;
