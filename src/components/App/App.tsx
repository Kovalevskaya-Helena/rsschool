import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { CardList } from "../CardList";
import { Search } from "../Search";
import { Dropdown } from "../Dropdown";

import { fetchAllCountries, getAllCountries, type Country } from "../../store/countrySlice";
import { AppDispatch } from "../../store/store";

import styles from './app.module.css';

type FitlerStrategy = (country: Country, filter: string) => boolean;

const filterStrategies: Record<string, FitlerStrategy> = {
  all: () => true,
  default: (country: Country, fitler: string) => country.region.toLowerCase() === fitler.toLowerCase()
} as const;

type SortStrategy = (countryA: Country, countryB: Country) => number;

const sortStrategies: Record<string, SortStrategy> = {
  populationAsc: (countryA: Country, countryB: Country) => (countryA.population - countryB.population),
  populationDesc: (countryA: Country, countryB: Country) => (countryB.population - countryA.population),
  alphabetAsc: (countryA: Country, countryB: Country) => (countryA.name.common.localeCompare(countryB.name.common)),
  alphabetDesc: (countryA: Country, countryB: Country) => (countryB.name.common.localeCompare(countryA.name.common)),
} as const;

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

  const arrayOfRegions = [
    { id: 'all', label: 'All' },
    ...countries.map(({ region }) => ({ id: region, label: region }))
  ];

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


  const regionFitlerStrategy = filterStrategies[regionFilter === 'all' ? 'all' : 'default'];
  const filterBySearch = (country: Country) => country.name.common.toLowerCase().includes(searchFilter.toLowerCase());
  const fitlerByRegion = (country: Country) => regionFitlerStrategy(country, regionFilter);
  const sortByStrategy = (countryA: Country, countryB: Country) => sortStrategies[sortBy](countryA, countryB);

  const filteredCountries = countries
    .filter(filterBySearch)
    .filter(fitlerByRegion)
    .toSorted(sortByStrategy);


  const onHighlightCard = (item: Country) => {
    const nextCards = [...selectedCards, item.name.common];
    setSelectedCards(nextCards);
    localStorage.setItem('selectedCards', JSON.stringify(nextCards));
  }

  return (
    <div className={styles.wrapper}>
      <div className={styles.box}>
        <Search value={searchFilter} onChange={(value) => setSearchFilter(value)} />
        <Dropdown value={regionFilter} items={arrayOfRegions} onChange={(item) => setRegionFilter(item.id)} />
        <Dropdown value={sortBy} items={optionsForSort} onChange={(item) => setSortBy(item.id)} />
      </div>
      <CardList items={filteredCountries} onHighlightCard={onHighlightCard} selectedCards={selectedCards} />
    </div>
  );
};
