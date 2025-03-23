import { FunctionComponent } from 'react';
import styles from './dropdown.module.css';
import { clsx } from '../../helpers/clsx';
import { useState } from 'react';
import { memo } from 'react';

export interface Item {
  id: string;
  label: string
}

interface DropdownProps {
  value: string,
  items: Item[];
  onChange: (item: Item) => void;
}

export const Dropdown: FunctionComponent<DropdownProps> = memo(({ value, onChange, items }) => {
  const [isOpen, setIsOpen] = useState(false);

  const onClick = (item: Item) => {
    onChange(item);
    setIsOpen(false);
  }

  return (
    <div className={styles.wrapper}>
      <div className={styles.button} onClick={() => setIsOpen(true)}>
        <span>{items.find((item) => item.id === value)?.label}</span>
        <span className={clsx("material-symbols-outlined", styles.icon)}>
          {isOpen ? 'keyboard_arrow_down' : 'keyboard_arrow_up'}
        </span>
      </div>
      <ul className={clsx(styles.list, isOpen && styles.open)}>
        {items.map((item) => <li key={item.label} className={styles.item} onClick={() => onClick(item)}>{item.label}</li>)}
      </ul>
    </div>
  );
});
