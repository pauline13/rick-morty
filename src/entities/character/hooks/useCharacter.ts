import { useEffect, useState } from 'react';

import {
  createErrorMessages,
  handleRequestError,
  REQUEST_ERROR_TYPE
} from '@/shared/helpers';

import { getCharacter } from '../api';
import type { Character } from '../model';

const CHARACTER_ERROR_MESSAGES = createErrorMessages('character');

export const useCharacter = (id: number) => {
  const [character, setCharacter] = useState<Character | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isNotFound, setIsNotFound] = useState(false);

  useEffect(() => {
    if (!id || Number.isNaN(id)) return;

    const controller = new AbortController();

    const fetchCharacter = async () => {
      try {
        setIsLoading(true);
        setIsNotFound(false);

        const data = await getCharacter(id, controller.signal);
        setCharacter(data);
      } catch (error: unknown) {
        const errorType = handleRequestError(error, CHARACTER_ERROR_MESSAGES);

        if (errorType === REQUEST_ERROR_TYPE.CANCELED) return;

        if (errorType === REQUEST_ERROR_TYPE.NOT_FOUND) {
          setIsNotFound(true);
          setCharacter(null);
          return;
        }

        setCharacter(null);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCharacter();

    return () => {
      controller.abort();
    };
  }, [id]);

  return {
    character,
    isLoading,
    isNotFound
  };
};
