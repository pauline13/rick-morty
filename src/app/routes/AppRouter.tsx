import { Route, Routes } from 'react-router';

import { MainLayout } from '@/app/layouts';
import { CharactersPage, CharacterInfoPage } from '@/pages';

const ROUTES = [
  {
    id: 'characters',
    path: '/',
    element: <CharactersPage />
  },
  {
    id: 'character-info',
    path: '/character-info/:id',
    element: <CharacterInfoPage />
  }
];

export function AppRouter() {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        {ROUTES.map((route) => (
          <Route key={route.id} path={route.path} element={route.element} />
        ))}
      </Route>
    </Routes>
  );
}
