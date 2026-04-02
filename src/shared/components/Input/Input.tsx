import type { ChangeEvent, ReactNode } from 'react';

import { CloseIcon } from '@/shared/assets';
import { ButtonIcon } from '@/shared/components';
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
  readOnly?: boolean;
  className?: string;
}

export const Input = ({
  placeholder = 'Input value',
  value,
  rightIcon,
  showClear = true,
  onChange,
  size = 'xl',
  variant = 'outline',
  readOnly = false,
  className
}: InputProps) => {
  const handleChangeValue = (e: ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value);
  };
  const handleClear = () => {
    onChange('');
  };

  return (
    <div
      className={classNames(
        'Input',
        `Input_${size}`,
        !readOnly && `Input_${variant}`,
        readOnly && 'Input_readonly'
      )}
    >
      {rightIcon && <div>{rightIcon}</div>}
      <input
        className={classNames(
          'Input__field',
          `Input__field_${size}`,
          `Input__field_${variant}`,
          className
        )}
        placeholder={placeholder}
        value={value}
        readOnly={readOnly}
        onChange={handleChangeValue}
      />
      {!readOnly && value !== '' && showClear && (
        <ButtonIcon type='button' size='sm' onClick={handleClear}>
          <CloseIcon />
        </ButtonIcon>
      )}
    </div>
  );
};
