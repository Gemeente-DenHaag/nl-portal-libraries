import React from 'react';
import './App.css';
import '@gemeente-denhaag/design-tokens-components';
import {ExampleComponent} from '@nl-portal/user-interface';
import environment from './environments/environment';

function App() {
  console.log('env', environment);
  return (
    <div className="App">
      learn react
      <ExampleComponent />
    </div>
  );
}

export default App;
