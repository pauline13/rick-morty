import { Route, Routes } from 'react-router';

import { MainLayout } from '@/app/layouts';
import { CharactersPage, NotFoundPage, CharacterInfoGuard } from '@/pages';

const ROUTES = [
  {
    id: 'characters',
    path: '/',
    element: <CharactersPage />
  },
  {
    id: 'character-info',
    path: '/character-info/:id',
    element: <CharacterInfoGuard />
  }
];

export function AppRouter() {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        {ROUTES.map((route) => (
          <Route key={route.id} path={route.path} element={route.element} />
        ))}
        <Route path='*' element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
}
