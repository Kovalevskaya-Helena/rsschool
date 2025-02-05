import { Component } from 'react';
import { Header } from '../Header';
import { Main } from '../Main/Main';
import { ErrorButton } from '../ErrorButton';
import { ErrorBoundary } from '../ErrorBoudary';
import { requests } from '../../helpers/requests';
import { Items, LoadStatus } from '../../helpers/types';
import './app.css';
export interface AppState {
  value: string;
  items: Items[];
  loadStatus: LoadStatus;
  errorText: string;
}
export class App extends Component<unknown, AppState> {
  state = {
    value: '',
    items: [],
    loadStatus: 'pending' as const,
    errorText: '',
  };

  componentDidMount() {
    this.getCacheFromLocalStorage();
    this.getPeoples();
  }

  getCacheFromLocalStorage = () => {
    const cache = localStorage.getItem('label');

    if (cache) {
      this.setState({ value: cache });
    }
  };

  setCacheToLocalStorage = () => {
    localStorage.setItem('label', this.state.value.trim());
  };

  getPeoples = async () => {
    const peopleUrl = new URL('https://swapi.dev/api/people/');
    peopleUrl.searchParams.set('search', this.state.value);

    this.setState({ items: [], loadStatus: 'loading', errorText: '' });

    const {
      data: { results: items },
      error: errorText,
    } = await requests.get(peopleUrl);

    this.setState({
      items,
      loadStatus: errorText ? 'error' : 'loaded',
      errorText,
    });
  };

  onChangeSearch = (text: string) => {
    this.setState({ value: text });
  };

  onSearchStart = () => {
    this.setCacheToLocalStorage();
    this.getPeoples();
  };

  render() {
    const { loadStatus } = this.state;

    return (
      <>
        <ErrorBoundary>
          <div className="container">
            <Header
              searchText={this.state.value}
              onChangeText={this.onChangeSearch}
              onSearch={this.onSearchStart}
            />
            <Main
              people={this.state.items}
              loadStatus={loadStatus}
              errorText={this.state.errorText}
            />
            <ErrorButton />
          </div>
        </ErrorBoundary>
      </>
    );
  }
}
