import { useState, useEffect } from 'react';
import { Header } from '../Header';
import { Main } from '../Main/Main';
import { ErrorButton } from '../ErrorButton';
import { requests } from '../../helpers/requests';
import { Items, LoadStatus } from '../../helpers/types';
import { useLocalStorage } from '../../helpers/useLocalStorage';
import './peopleSearch.css';
import { useNavigate, useSearchParams, useParams } from 'react-router';

interface ItemsLoadState {
  items: Items[];
  previous: string | null;
  next: string | null;
  loadStatus: LoadStatus;
  errorText: string;
}

export const PeopleSearch = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { id } = useParams();
  const navigate = useNavigate();

  const searchTextStorage = useLocalStorage('label');

  const [searchText, setSearchText] = useState<string>(
    searchTextStorage.getItem() ?? ''
  );

  const [itemsLoadState, setItemsLoadState] = useState<ItemsLoadState>({
    items: [],
    loadStatus: 'pending',
    errorText: '',
    previous: null,
    next: null,
  });

  const getInitialPeopleUrl = (): URL => {
    const peopleUrl = new URL('https://swapi.dev/api/people/');

    if (searchText) {
      peopleUrl.searchParams.set('search', searchText);
    }

    return peopleUrl;
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

    setSearchParams(new URL(url).searchParams);
  };

  useEffect(() => {
    getPeoples(getInitialPeopleUrl());
  }, []);

  const setCacheToLocalStorage = () => {
    searchTextStorage.setItem(searchText.trim());
  };

  const onChangeSearch = (text: string) => {
    setSearchText(text);
  };

  const onSearchStart = () => {
    setCacheToLocalStorage();
    getPeoples(getInitialPeopleUrl());
  };

  const closeDetails = () => {
    const isDetailsOpened = id !== undefined;

    if (isDetailsOpened) {
      navigate({
        pathname: `/`,
        search: searchParams.toString(),
      });
    }
  };

  return (
    <div className="container" onClick={closeDetails}>
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
