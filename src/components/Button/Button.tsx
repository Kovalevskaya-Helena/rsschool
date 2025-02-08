import { ReactNode } from 'react';
import { clsx } from '../../helpers/clsx';
import './button.css';

export const Button = ({
  children,
  className,
  disabled,
  onClick,
}: {
  children: ReactNode;
  className: string;
  disabled?: boolean;
  onClick: () => void;
}) => {
  return (
    <button
      className={clsx('button', disabled && 'disabled', className)}
      type="button"
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
};
