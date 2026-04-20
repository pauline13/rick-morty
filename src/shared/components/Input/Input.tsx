import type { ChangeEvent, ReactNode } from 'react';

import { CloseIcon } from '@/shared/assets';
import { ButtonIcon } from '@/shared/components';
import { classNames } from '@/shared/helpers';

import './Input.css';

interface InputProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  rightIcon?: ReactNode;
  showClear?: boolean;
  size?: 'xl' | 'sm';
  clearIconSize?: 'xl' | 'sm';
  variant?: 'underline' | 'outline';
  readOnly?: boolean;
  classNameWrapper?: string;
  classNameInput?: string;
}

export const Input = ({
  placeholder = 'Input value',
  value,
  rightIcon,
  showClear = true,
  onChange,
  size = 'xl',
  clearIconSize = 'sm',
  variant = 'outline',
  readOnly = false,
  classNameWrapper,
  classNameInput
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
        readOnly && 'Input_readonly',
        classNameWrapper
      )}
    >
      {rightIcon && <div>{rightIcon}</div>}
      <input
        className={classNames(
          'Input__field',
          `Input__field_${size}`,
          `Input__field_${variant}`,
          classNameInput
        )}
        placeholder={placeholder}
        value={value}
        readOnly={readOnly}
        onChange={handleChangeValue}
      />
      {!readOnly && value !== '' && showClear && (
        <ButtonIcon type='button' size={clearIconSize} onClick={handleClear}>
          <CloseIcon />
        </ButtonIcon>
      )}
    </div>
  );
};
