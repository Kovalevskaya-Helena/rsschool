import { ReactNode } from 'react';
import { clsx } from '../../helpers/clsx';
import styles from './button.module.css';

export const Button = ({
  children,
  className,
  disabled,
  onClick,
  ariaLabel,
}: {
  children: ReactNode;
  className?: string;
  disabled?: boolean;
  onClick: () => void;
  ariaLabel?: string;
}) => {
  return (
    <button
      className={clsx(styles.button, disabled && styles.disabled, className)}
      type="button"
      onClick={onClick}
      disabled={disabled}
      aria-label={ariaLabel}
    >
      {children}
    </button>
  );
};
