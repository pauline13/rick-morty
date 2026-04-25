import './Button.css';
import { classNames } from '@/shared/helpers';

interface ButtonProps {
  text?: string;
  icon?: React.ReactNode;
  onClick?: () => void;
  className?: string;
}

export const Button = ({ text, icon, onClick, className }: ButtonProps) => {
  return (
    <button className={classNames('Button', className)} onClick={onClick}>
      {icon && <span className='Button__icon'>{icon}</span>}
      {text && <span className='Button__text'>{text}</span>}
    </button>
  );
};
