import { useEffect, useRef, useState, type ReactNode } from 'react';

import { ArrowDownIcon } from '@/shared/assets';
import { classNames } from '@/shared/helpers';
import './Select.css';

export interface Option {
  label: string;
  value: string;
}

interface SelectProps {
  options: Option[];
  value: string;
  readOnly?: boolean;
  onChange: (value: string) => void;
  placeholder?: string;
  size?: 'xl' | 'sm';
  renderSuffix?: (option: Option) => ReactNode;
}

export const Select = ({
  options,
  value,
  readOnly = false,
  onChange,
  placeholder = 'Select an option',
  size = 'xl',
  renderSuffix
}: SelectProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (!rootRef.current?.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const selectedOption = options.find((option) => option.value === value);

  const handleToggle = () => {
    if (readOnly) return;
    setIsOpen((prev) => !prev);
  };

  const handleSelect = (selectedValue: string) => {
    if (readOnly) return;
    onChange(selectedValue);
    setIsOpen(false);
  };

  const isDropdownOpen = isOpen && !readOnly;

  return (
    <div className='Select__wrapper' ref={rootRef}>
      <div
        className={classNames(
          'Select',
          `Select_${size}`,
          !readOnly && 'Select_interactive',
          readOnly && 'Select_readonly'
        )}
        onClick={!readOnly ? handleToggle : undefined}
      >
        <div className='Select__value'>
          {selectedOption ? (
            <>
              <span>{selectedOption.label}</span>
              {renderSuffix?.(selectedOption)}
            </>
          ) : (
            placeholder
          )}
        </div>

        <div
          className={classNames(
            'Select__icon',
            `Select__icon_${size}`,
            isDropdownOpen && 'Select__icon_open'
          )}
        >
          <ArrowDownIcon />
        </div>
      </div>

      {isDropdownOpen && (
        <div
          className={classNames('Select__dropdown', `Select__dropdown_${size}`)}
        >
          {options.map((option) => (
            <div
              key={option.value}
              className={classNames('Select__option', `Select__option_${size}`)}
              onClick={() => handleSelect(option.value)}
            >
              <span className='Select__optionLabel'>{option.label}</span>
              {renderSuffix?.(option)}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
