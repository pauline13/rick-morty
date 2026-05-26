import type { Option } from '@/shared/components';

  import { withAllOption, toFilterValue } from '../filterOptions';

const mockOptions: Option<'alive' | 'dead' | 'unknown'>[] = [
  { label: 'Alive', value: 'alive' },
  { label: 'Dead', value: 'dead' },
  { label: 'Unknown', value: 'unknown' },
];

const allOption: Option<'all'> = { label: 'All', value: 'all' };

describe('withAllOption', () => {
  it('prepends the all-option to the list', () => {
    const result = withAllOption(mockOptions, allOption);
    expect(result[0]).toEqual(allOption);
  });

  it('keeps the original options after the all-option', () => {
    const result = withAllOption(mockOptions, allOption);
    expect(result.slice(1)).toEqual(mockOptions);
  });

  it('returns a list with one more item than the original', () => {
    const result = withAllOption(mockOptions, allOption);
    expect(result).toHaveLength(mockOptions.length + 1);
  });

  it('returns only the all-option when given an empty list', () => {
    const result = withAllOption([], allOption);
    expect(result).toEqual([allOption]);
  });
});

describe('toFilterValue', () => {
  it('returns the value of a matching option', () => {
    expect(toFilterValue('alive', mockOptions)).toBe('alive');
  });

  it('returns an empty string when no option matches', () => {
    expect(toFilterValue('female', mockOptions)).toBe('');
  });

  it('returns an empty string when given an empty option list', () => {
    expect(toFilterValue('alive', [])).toBe('');
  });
});
