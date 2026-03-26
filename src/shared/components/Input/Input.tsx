import type { ChangeEvent, ReactNode } from 'react';

import { CloseIcon } from '@/shared/assets';
import { classNames } from '@/shared/helpers';

import './Input.css';

interface InputProps {
  placeholder?: string;
  value: string;
  rightIcon?: ReactNode;
  showClear?: boolean;
  onChange: (value: string) => void;
  size?: 'xl' | 'sm';
  variant?: 'underline' | 'outline';
}

export const Input = ({
  placeholder = 'Input value',
  value,
  rightIcon,
  showClear = true,
  onChange,
  size = 'xl',
  variant = 'outline'
}: InputProps) => {
  const handleChangeVaule = (e: ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value);
  };
  const handleClear = () => {
    onChange('');
  };

  return (
    <div className={classNames('Input', `Input_${size}`, `Input_${variant}`)}>
      {rightIcon && <div>{rightIcon}</div>}
      <input
        className={classNames('Input__field', `Input__field_${variant}`)}
        placeholder={placeholder}
        value={value}
        onChange={handleChangeVaule}
      />
      {value !== '' && showClear && (
        <button
          className='Input__clearButton'
          type='button'
          onClick={handleClear}
        >
          <CloseIcon />
        </button>
      )}
    </div>
  );
};
