import type { MouseEventHandler, ReactNode } from 'react';

import { classNames } from '@/shared/helpers';
import './ButtonIcon.css';

interface ButtonIconProps {
  children: ReactNode;
  size?: 'xl' | 'sm';
  type?: 'button' | 'submit' | 'reset';
  onClick?: MouseEventHandler<HTMLButtonElement>;
  className?: string;
}

export const ButtonIcon = ({
  children,
  size = 'xl',
  type = 'button',
  onClick,
  className
}: ButtonIconProps) => {
  return (
    <button
      className={classNames('ButtonIcon', `ButtonIcon_${size}`, className)}
      onClick={onClick}
      type={type}
    >
      {children}
    </button>
  );
};
