import { useState, useEffect } from 'react';
import { Header } from '../Header';
import { Main } from '../Main/Main';
import { ErrorButton } from '../ErrorButton';
import { useLocalStorage } from '../../helpers/useLocalStorage';
import './peopleSearch.css';
import { useNavigate, useSearchParams, useParams } from 'react-router';

export const PeopleSearch = () => {
  const searchTextStorage = useLocalStorage('label');

  const initialSearchText = searchTextStorage.getItem() ?? '';

  const [searchParams, setSearchParams] = useSearchParams();
  const { id } = useParams();
  const navigate = useNavigate();

  const [searchText, setSearchText] = useState<string>(initialSearchText);

  useEffect(() => {
    const label = searchTextStorage.getItem();
    if (label) {
      setSearchParams((prev) => {
        prev.set('search', label);
        return prev;
      });
    }
  }, []);

  const setCacheToLocalStorage = (value: string) => {
    searchTextStorage.setItem(value.trim());
  };

  const onChangeSearch = (text: string) => {
    setSearchText(text);
  };

  const onSearchStart = () => {
    const nextSearch = searchText.trim();
    setCacheToLocalStorage(nextSearch);

    setSearchParams((prev) => {
      if (nextSearch) {
        prev.set('search', nextSearch);
      } else {
        prev.delete('search');
      }

      prev.delete('page');
      return prev;
    });
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
      <Main />
      <ErrorButton />
    </div>
  );
};
