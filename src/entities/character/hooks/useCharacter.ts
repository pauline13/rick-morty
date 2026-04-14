import { useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';

import { getCharacter } from '@/entities/character/api';
import type { Character } from '@/entities/character/model';
import { isRequestCanceled } from '@/shared/helpers';

export const useCharacter = (id: number) => {
  const [character, setCharacter] = useState<Character | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!id || Number.isNaN(id)) return;

    const controller = new AbortController();

    const fetchCharacter = async () => {
      try {
        setLoading(true);

        const data = await getCharacter(id, controller.signal);
        setCharacter(data);
      } catch (error: unknown) {
        if (isRequestCanceled(error)) return;

        toast.error('Failed to load character');
        setCharacter(null);
      } finally {
        setLoading(false);
      }
    };

    fetchCharacter();

    return () => {
      controller.abort();
    };
  }, [id]);

  return {
    character,
    loading
  };
};
