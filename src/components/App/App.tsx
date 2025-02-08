import { useState, useEffect } from 'react';
import { Header } from '../Header';
import { Main } from '../Main/Main';
import { ErrorButton } from '../ErrorButton';
import { ErrorBoundary } from '../ErrorBoudary';
import { requests } from '../../helpers/requests';
import { Items, LoadStatus } from '../../helpers/types';
import './app.css';

const getInitialSearchText = () => localStorage.getItem('label') ?? '';

interface ItemsLoadState {
  items: Items[];
  loadStatus: LoadStatus;
  errorText: string;
}

export const App = () => {
  const [searchText, setSearchText] = useState<string>(getInitialSearchText);
  const [itemsLoadState, setItemsLoadState] = useState<ItemsLoadState>({
    items: [],
    loadStatus: 'pending',
    errorText: '',
  });

  useEffect(() => {
    getPeoples();
  }, []);

  const setCacheToLocalStorage = () => {
    localStorage.setItem('label', searchText.trim());
  };

  const getPeoples = async () => {
    const peopleUrl = new URL('https://swapi.dev/api/people/');
    peopleUrl.searchParams.set('search', searchText);

    setItemsLoadState({
      items: [],
      loadStatus: 'loading',
      errorText: '',
    });

    const {
      data: { results: items },
      error: errorText,
    } = await requests.get(peopleUrl);

    setItemsLoadState({
      items,
      loadStatus: errorText ? 'error' : 'loaded',
      errorText,
    });
  };

  const onChangeSearch = (text: string) => {
    setSearchText(text);
  };

  const onSearchStart = () => {
    setCacheToLocalStorage();
    getPeoples();
  };

  return (
    <ErrorBoundary>
      <div className="container">
        <Header
          searchText={searchText}
          onChangeText={onChangeSearch}
          onSearch={onSearchStart}
        />
        <Main
          people={itemsLoadState.items}
          loadStatus={itemsLoadState.loadStatus}
          errorText={itemsLoadState.errorText}
        />
        <ErrorButton />
      </div>
    </ErrorBoundary>
  );
};
