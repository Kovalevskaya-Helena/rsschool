import { FunctionComponent } from 'react'
import styles from './card.module.css'
import { Country } from '../../store/countrySlice';
import { memo } from 'react';

import { clsx } from '../../helpers/clsx';

interface CardProps {
  item: Country;
  isSelected: boolean;
  onHighlightCard: (item: Country) => void;
}

export const Card: FunctionComponent<CardProps> = memo(({ item, isSelected, onHighlightCard }) => {

  const { flags: { png }, name: { common }, population, region } = item;

  return (
    <div className={clsx(styles.card, isSelected && styles.highlight)} onClick={() => onHighlightCard(item)}>
      <img src={png} alt="Flag" className={styles.flag} />
      <div className={styles.content}>
        <h2 className={styles.title}>{common}</h2>
        <p className={styles.info}><strong>Population:</strong>{population}</p>
        <p className={styles.info}><strong>Region:</strong>{region}</p>
      </div>
    </div>
  )
});
