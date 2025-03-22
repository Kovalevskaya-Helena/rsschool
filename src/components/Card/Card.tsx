import { FunctionComponent } from 'react'
import styles from './card.module.css'

interface CardProps {
  flags: Record<string, string>,
  name: string,
  population: number,
  region: string,
}
export const Card: FunctionComponent<CardProps> = ({ flags, name, population, region }) => {
  return (
    <div className={styles.card}>
      <img src={flags.png} alt="Flag" className={styles.flag} />
      <div className={styles.content}>
        <h2 className={styles.title}>{name}</h2>
        <p className={styles.info}><strong>Population:</strong>{population}</p>
        <p className={styles.info}><strong>Region:</strong>{region}</p>
      </div>
    </div>
  )
}
