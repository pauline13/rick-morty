import './Button.css';
import { classNames } from '@/shared/helpers';

interface ButtonProps {
  text?: string;
  icon?: React.ReactNode;
  onClick?: () => void;
  className?: string;
  textClassName?: string;
  disabled?: boolean;
}

export const Button = ({
  text,
  icon,
  onClick,
  className,
  textClassName,
  disabled
}: ButtonProps) => {
  return (
    <button
      className={classNames('Button', className, disabled && 'Button_disabled')}
      onClick={onClick}
      disabled={disabled}
    >
      {icon && <span className='Button__icon'>{icon}</span>}
      {text && (
        <span className={classNames('Button__text', textClassName)}>
          {text}
        </span>
      )}
    </button>
  );
};
