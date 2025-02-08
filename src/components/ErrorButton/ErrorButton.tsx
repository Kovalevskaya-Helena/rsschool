import { useState } from 'react';
import './errorbutton.css';
type infoIndexState = number | undefined;
export const ErrorButton = () => {
  const [infoIndex, setInfoIndex] = useState<infoIndexState>(undefined);
  const infos: string[] = [];

  const onClick = () => {
    setInfoIndex(1);
  };

  const info = infoIndex ? infos[infoIndex].toLowerCase() : '';
  return (
    <button className="error-button" type="button" onClick={onClick}>
      {`Error button${info}`}
    </button>
  );
};
