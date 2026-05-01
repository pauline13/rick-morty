import { Navigate, useParams } from 'react-router';

import { CharacterInfoPage } from './CharacterInfoPage';

export const CharacterInfoGuard = () => {
  const { id } = useParams();

  const numericId = Number(id);

  if (!id || Number.isNaN(numericId)) {
    return <Navigate to='/not-found' replace />;
  }

  return <CharacterInfoPage />;
};
