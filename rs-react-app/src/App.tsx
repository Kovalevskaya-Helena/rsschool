import React, { Component } from 'react';
import { Header } from './components/Header';
import { Main } from './components/Main';
import { ErrorButton } from './components/ErrorButton';
import './app.css';

export class App extends Component {
  render() {
    return (
      <>
        <div className="container">
          <Header />
          <Main />
          <ErrorButton />
        </div>
      </>
    );
  }
}

export default App;
