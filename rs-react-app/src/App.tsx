import React, { Component } from 'react';
import { Header } from './components/Header';
import { Main } from './components/Main';
import { ErrorButton } from './components/ErrorButton';
import { ErrorBoundary } from './components/ErrorBoundary';
import './app.css';

export class App extends Component {
  state = { value: '', items: [], IsLoading: false, error: null };
  componentDidMount() {
    this.getItem();
  }

  getItem = () => {
    if (localStorage.getItem('label')) {
      this.setState({ value: localStorage.getItem('label') });
    }
    return null;
  };

  onChange = (event) => {
    this.setState({ value: event.target.value });
    console.log(this.state.value);
  };

  render() {
    return (
      <>
        <ErrorBoundary>
          <div className="container">
            <Header
              searchText={this.state.value}
              onChangeText={this.onChange}
            />
            <Main />
            <ErrorButton />
          </div>
        </ErrorBoundary>
      </>
    );
  }
}

export default App;
