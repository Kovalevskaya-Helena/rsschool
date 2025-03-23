import { FunctionComponent } from "react";
import { Card } from "../Card";
import { Country } from "../../store/countrySlice";

import styles from './cardlist.module.css'


interface CardListProps {
  items: Country[];
  selectedCards: string[];
  onHighlightCard: (item: Country) => void;
}

export const CardList: FunctionComponent<CardListProps> = ({ items, selectedCards, onHighlightCard }) => {

  return (<div className={styles.wrapper}>
    {items.map((item) => {
      return <Card key={item.name.common} item={item} onHighlightCard={onHighlightCard} isSelected={selectedCards.includes(item.name.common)} />
    })}
  </div>)

}
