import { FormEvent, FunctionComponent } from 'react';
import styles from './search.module.css'

interface SearchProps {
  value: string;
  onChange: (text: string) => void;
}

export const Search: FunctionComponent<SearchProps> = ({ value, onChange }) => {

  const onSubmit = (event: FormEvent) => {
    event.preventDefault();
  };

  return (<>
    <form className={styles.container} onSubmit={onSubmit}>
      <input type="text" className={styles.input} placeholder="Search..." value={value} onChange={(event) => onChange(event.target.value)} />
      <button className={styles.button}>
        <span className="material-symbols-outlined">search</span>
      </button>
    </form>
  </>)
}
