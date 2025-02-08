import { useState, useEffect } from 'react';
import { Header } from '../Header';
import { Main } from '../Main/Main';
import { ErrorButton } from '../ErrorButton';
import { requests } from '../../helpers/requests';
import { Items, LoadStatus } from '../../helpers/types';
import './peopleSearch.css';

const getInitialSearchText = () => localStorage.getItem('label') ?? '';

interface ItemsLoadState {
  items: Items[];
  previous: string | null;
  next: string | null;
  loadStatus: LoadStatus;
  errorText: string;
}

export const PeopleSearch = () => {
  const [searchText, setSearchText] = useState<string>(getInitialSearchText);
  const [itemsLoadState, setItemsLoadState] = useState<ItemsLoadState>({
    items: [],
    loadStatus: 'pending',
    errorText: '',
    previous: null,
    next: null,
  });

  const getInitialPeopleUrl = (): URL => {
    const peopleUrl = new URL('https://swapi.dev/api/people/');
    peopleUrl.searchParams.set('search', searchText);

    return peopleUrl;
  };

  useEffect(() => {
    getPeoples(getInitialPeopleUrl());
  }, []);

  const setCacheToLocalStorage = () => {
    localStorage.setItem('label', searchText.trim());
  };

  const getPeoples = async (url: string | URL) => {
    setItemsLoadState({
      items: [],
      loadStatus: 'loading',
      previous: null,
      next: null,
      errorText: '',
    });

    const {
      data: { results: items, previous, next },
      error: errorText,
    } = await requests.get(url);

    setItemsLoadState({
      items,
      loadStatus: errorText ? 'error' : 'loaded',
      previous,
      next,
      errorText,
    });
  };

  const onChangeSearch = (text: string) => {
    setSearchText(text);
  };

  const onSearchStart = () => {
    setCacheToLocalStorage();
    getPeoples(getInitialPeopleUrl());
  };

  return (
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
        previous={itemsLoadState.previous}
        next={itemsLoadState.next}
        onPagination={(url) => getPeoples(url)}
      />
      <ErrorButton />
    </div>
  );
};
