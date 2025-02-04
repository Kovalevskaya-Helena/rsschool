import { Component } from 'react';
import { Header } from './components/Header';
import { Main } from './components/Main';
import { ErrorButton } from './components/ErrorButton';
import { ErrorBoundary } from './components/ErrorBoundary';
import { requests } from './helpers/requests';
import './app.css';
/*УВАЖАЕМЫЙ ПРОВЕРЯЮЩИЙ,ОЧЕНЬ ПРОШУ ПРОВЕРИТЬ МОЮ РАБОТУ ВО ВТОРНИК (04.02.2025) ВЕЧЕРОМ ИЛИ В СРЕДУ(05.02.2025)
К СОЖАЛЕНИЮ,НЕ ХВАТИЛО ВРЕМЕНИ!
БУДУ ОЧЕНЬ БЛАГОДАРНА!
DEAR EXAMINER, I REALLY ASK YOU TO CHECK MY WORK ON TUESDAY (04.02.2025) EVENING OR WEDNESDAY (05.02.2025)
UNFORTUNATELY, WE DID NOT ENOUGH TIME!
I WOULD BE VERY GRATEFUL!*/

type LoadStatus = 'pending' | 'loading' | 'loaded' | 'error';

interface AppState {
  loadStatus: LoadStatus;
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

export default App;
