import type { Character } from '@/entities/character';

export const formatFieldValue = (value: Character[keyof Character]) => {
  const normalizeValue = (fieldValue: string | null | undefined) => {
    const trimmedValue = fieldValue?.trim();

    if (!trimmedValue) {
      return 'Unknown';
    }

    return trimmedValue
      .toLowerCase()
      .split(/\s+/)
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  };

  if (value && typeof value === 'object' && 'name' in value) {
    return normalizeValue(value.name);
  }

  if (typeof value === 'string') {
    return normalizeValue(value);
  }

  return 'Unknown';
};
