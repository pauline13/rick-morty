import React from 'react';
import './Button.css';

interface ButtonProps {
  text?: string;
  icon?: React.ReactNode;
  onClick?: () => void;
}

export const Button = ({ text, icon, onClick }: ButtonProps) => {
  return (
    <button className='Button' onClick={onClick}>
      {icon && <span className='Button__icon'>{icon}</span>}
      {text && <span className='Button__text'>{text}</span>}
    </button>
  );
};
