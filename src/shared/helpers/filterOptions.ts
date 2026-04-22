import type { Option } from '@/shared/components';

export const withAllOption = <T extends string>(
  options: Option<T>[],
  allOption: Option<'all'>
): Option<T | 'all'>[] => [allOption, ...options];

export const toFilterValue = <T extends string>(
  optionValue: string,
  options: Option<T>[]
): T | '' => {
  const selectedOption = options.find((option) => option.value === optionValue);

  return selectedOption ? selectedOption.value : '';
};
