import { Card } from "../Card";
import { Country } from "../../store/countrySlice";

import styles from './cardlist.module.css'




export const CardList = ({ items }: { items: Country[] }) => {

  return (<div className={styles.wrapper}>
    {items.map((item) => {
      return <Card flags={item.flags} name={item.name.common} population={item.population} region={item.region} />
    })}
  </div>)

}
