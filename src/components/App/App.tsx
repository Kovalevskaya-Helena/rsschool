import { useState, useEffect, useCallback, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";

import { CardList } from "../CardList";
import { Search } from "../Search";
import { Dropdown } from "../Dropdown";

import { fetchAllCountries, getAllCountries, type Country } from "../../store/countrySlice";
import { AppDispatch } from "../../store/store";

import styles from './app.module.css';

const getCardsFromLocalStorage = () => {
  const storedCards = localStorage.getItem('selectedCards');
  return storedCards ? JSON.parse(storedCards) : [];
};

export const App = () => {
  const [searchFilter, setSearchFilter] = useState<string>('');
  const [regionFilter, setRegionFilter] = useState<string>('all');
  const [sortBy, setSortBy] = useState<string>('populationAsc');
  const [selectedCards, setSelectedCards] = useState<string[]>([]);

  const dispatch: AppDispatch = useDispatch();
  const countries = useSelector(getAllCountries);

  const arrayOfRegions = useMemo(() => {
    const regionsUnique = [...new Set(countries.map(({ region }) => region))];

    return [
      { id: 'all', label: 'All' },
      ...regionsUnique.map((region) => ({ id: region, label: region }))
    ];
  }, [countries]);

  const optionsForSort = [
    { id: 'populationAsc', label: 'By population ascending' },
    { id: 'populationDesc', label: 'By population descending' },
    { id: 'alphabetAsc', label: 'By ascending (A to Z)' },
    { id: 'alphabetDesc', label: 'By descending (Z to A)' },
  ];

  useEffect(() => {
    dispatch(fetchAllCountries());
    setSelectedCards(getCardsFromLocalStorage());
  }, []);

  const filteredCountries = countries
    .filter((country: Country) => country.name.common.toLowerCase().includes(searchFilter.toLowerCase()))
    .filter((country: Country) => regionFilter === 'all' ? country : country.region.toLowerCase() === regionFilter.toLowerCase())
    .toSorted((countryA: Country, countryB: Country) => {
      if (sortBy === 'populationAsc') return countryA.population - countryB.population;
      if (sortBy === 'populationDesc') return countryB.population - countryA.population;
      if (sortBy === 'alphabetAsc') return countryA.name.common.localeCompare(countryB.name.common);
      if (sortBy === 'alphabetDesc') return countryB.name.common.localeCompare(countryA.name.common);

      return 0;
    });


  const onHighlightCard = (item: Country) => {
    const nextCards = [...selectedCards, item.name.common];
    setSelectedCards(nextCards);
    localStorage.setItem('selectedCards', JSON.stringify(nextCards));
  }

  const handleSortChange = useCallback((item: { id: string }) => {
    setSortBy(item.id)
  }, [setSortBy]);

  const handleRegionChange = useCallback((item: { id: string }) => {
    setRegionFilter(item.id)
  }, [setRegionFilter]);

  return (
    <div className={styles.wrapper}>
      <div className={styles.box}>
        <Search value={searchFilter} onChange={(value) => setSearchFilter(value)} />
        <Dropdown value={regionFilter} items={arrayOfRegions} onChange={handleRegionChange} />
        <Dropdown value={sortBy} items={optionsForSort} onChange={handleSortChange} />
      </div>
      <CardList items={filteredCountries} onHighlightCard={onHighlightCard} selectedCards={selectedCards} />
    </div>
  );
};
