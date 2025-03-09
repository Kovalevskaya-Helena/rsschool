import { List } from '../List';
import { Popup } from '../Popup';
import styles from './main.module.css';
import { Pagination } from '../Pagination';

export const Main = () => {
  return (
    <div className={styles.mainContainer}>
      <header className={styles.mainHeader}>Results</header>
      <List />
      <Pagination />
      <Popup />
    </div>
  );
};
