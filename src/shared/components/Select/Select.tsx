import { useEffect, useRef, useState, type ReactNode } from 'react';

import { ArrowDownIcon } from '@/shared/assets';
import './Select.css';

export type Option = {
  label: string;
  value: string;
};

type SelectProps = {
  options: Option[];
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  size?: 'xl' | 'sm';
  renderSuffix?: (option: Option) => ReactNode;
};

export const Select = ({
  options,
  value,
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

  const handleToggle = () => setIsOpen((prev) => !prev);

  const handleSelect = (selectedValue: string) => {
    onChange(selectedValue);
    setIsOpen(false);
  };

  return (
    <div className='Select__wrapper' ref={rootRef}>
      <div className={`Select Select_${size}`} onClick={handleToggle}>
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
          className={`Select__icon Select__icon_${size} ${isOpen && 'Select__icon_open'}`}
        >
          <ArrowDownIcon />
        </div>
      </div>

      {isOpen && (
        <div className={`Select__dropdown Select__dropdown_${size}`}>
          {options.map((option) => (
            <div
              key={option.value}
              className={`Select__option Select__option_${size}`}
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
