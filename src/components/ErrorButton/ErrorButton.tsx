import { useState } from 'react';
import styles from './errorbutton.module.css';

type infoIndexState = number | undefined;
export const ErrorButton = () => {
  const [infoIndex, setInfoIndex] = useState<infoIndexState>(undefined);
  const infos: string[] = [];

  const onClick = () => {
    setInfoIndex(1);
  };

  const info = infoIndex ? infos[infoIndex].toLowerCase() : '';

  return (
    <button className={styles.error_button} type="button" onClick={onClick}>
      {`Error button${info}`}
    </button>
  );
};
