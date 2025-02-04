import { Component } from 'react';
import { Header } from './components/Header';
import { Main } from './components/Main';
import { ErrorButton } from './components/ErrorButton';
import { ErrorBoundary } from './components/ErrorBoundary';
import './app.css';
/*УВАЖАЕМЫЙ ПРОВЕРЯЮЩИЙ,ОЧЕНЬ ПРОШУ ПРОВЕРИТЬ МОЮ РАБОТУ ВО ВТОРНИК (04.02.2025) ВЕЧЕРОМ ИЛИ В СРЕДУ(05.02.2025)
К СОЖАЛЕНИЮ,НЕ ХВАТИЛО ВРЕМЕНИ!
БУДУ ОЧЕНЬ БЛАГОДАРНА!
DEAR EXAMINER, I REALLY ASK YOU TO CHECK MY WORK ON TUESDAY (04.02.2025) EVENING OR WEDNESDAY (05.02.2025)
UNFORTUNATELY, WE DID NOT ENOUGH TIME!
I WOULD BE VERY GRATEFUL!*/
export class App extends Component {
  state = { value: '', items: [], IsLoading: false, error: null };

  componentDidMount() {
    this.getCacheFromLocalStorage();
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

    const response = await fetch(peopleUrl);

    if (!response.ok) {
      throw new Error(
        `Could not fetch ${peopleUrl} with ${response.status} status`
      );
    }

    const data = await response.json();

    this.setState({ items: data.results });
  };

  onChangeSearch = (text: string) => {
    this.setState({ value: text });
  };

  onSearchStart = () => {
    this.setCacheToLocalStorage();
    this.getPeoples();
  };

  render() {
    console.log(this.state.items);

    return (
      <>
        <ErrorBoundary>
          <div className="container">
            <Header
              searchText={this.state.value}
              onChangeText={this.onChangeSearch}
              onSearch={this.onSearchStart}
            />
            <Main people={this.state.items} />
            <ErrorButton />
          </div>
        </ErrorBoundary>
      </>
    );
  }
}

export default App;
