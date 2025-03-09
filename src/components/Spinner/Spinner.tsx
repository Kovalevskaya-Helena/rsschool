import styles from './spinner.module.css';

export const Spinner = () => {
  return (
    <div className={styles.ldsCss} data-testid="spinner">
      <div className={styles.ldsDoubleRing}>
        <div></div>
        <div></div>
      </div>
    </div>
  );
};
