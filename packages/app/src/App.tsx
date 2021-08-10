import React from 'react';
import './App.css';
import '@gemeente-denhaag/design-tokens-components';
import {ExampleComponent} from '@nl-portal/user-interface';

function App() {
  return (
    <div className="App">
      {process.env.REACT_APP_KEYCLOAK_CLIENT_ID}
      learn react
      <ExampleComponent />
    </div>
  );
}

export default App;
