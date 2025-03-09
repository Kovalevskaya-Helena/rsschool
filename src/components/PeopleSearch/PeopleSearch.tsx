import { useState, useEffect } from 'react';
import { Header } from '../Header';
import { Main } from '../Main/Main';
import { ErrorButton } from '../ErrorButton';
import { useLocalStorage } from '../../helpers/useLocalStorage';
import styles from './peopleSearch.module.css';
import { useRouter } from 'next/router';
import { useGetStarWarsPeople } from '../../hooks/useGetStarWarsPeople';
import { clsx } from '../../helpers/clsx';
import { filterObjectKeys } from 'src/helpers/filterObjectKeys';

export const PeopleSearch = () => {
  const router = useRouter();

  const searchTextStorage = useLocalStorage('userSearch');
  const [searchText, setSearchText] = useState<string>(
    searchTextStorage.getItem() ?? ''
  );
  const { updateQuery, setQuery } = useGetStarWarsPeople();

  useEffect(() => {
    const searchCached = searchTextStorage.getItem();
    const searchCurrent = router.query.search;

    if (searchCached && searchCached !== searchCurrent) {
      updateQuery({
        search: searchCached,
        page: '1',
      });
    }
  }, []);

  const onChangeSearch = (text: string) => {
    setSearchText(text);
  };

  const onSearchStart = () => {
    const nextSearch = searchText.trim();
    searchTextStorage.setItem(nextSearch);

    setQuery({
      ...filterObjectKeys(router.query, (key) => key !== 'search'),
      ...(nextSearch && { search: nextSearch }),
      page: '1',
    });
  };

  const closeDetails = () => {
    const isDetailsOpened = router.query.details;

    if (isDetailsOpened) {
      router.push(
        {
          pathname: '/',
          query: filterObjectKeys(router.query, (key) => key !== 'details'),
        },
        undefined,
        { shallow: true }
      );
    }
  };

  return (
    <div className={clsx(styles.container, 'container')} onClick={closeDetails}>
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
