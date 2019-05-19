import React from 'react';
import { SignIn } from 'aws-amplify-react';

export default class CustomSignIn extends SignIn {
  constructor (props) {
    super(props);

    this._validAuthStates = ['signIn', 'signedOut', 'signedUp'];
  }

  showComponent() {
    const { loading } = this.state;

    return (
      <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        { loading ? (
          <h1>Loading</h1>
        ) : null}
        <div className="mb-4">
          <label
            className="block text-grey-darker text-sm font-bold mb-2"
            htmlFor="username"
          >
            Username
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-grey-darker leading-tight focus:outline-none focus:shadow-outline"
            id="username"
            key="username"
            name="username"
            onChange={this.handleInputChange}
            type="text"
            placeholder="Username"
          />
        </div>
        <div className="mb-6">
          <label
            className="block text-grey-darker text-sm font-bold mb-2"
            htmlFor="password"
          >
            Password
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-grey-darker mb-3 leading-tight focus:outline-none focus:shadow-outline"
            id="password"
            key="password"
            name="password"
            onChange={this.handleInputChange}
            type="password"
            placeholder="******************"
          />
        </div>
        <div className="flex items-center justify-between">
          <button
            className="bg-blue hover:bg-blue-dark text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="button"
            onClick={(e) => super.signIn(e)}
          >
            Login
          </button>
        </div>
      </form>
    );
  }
}
