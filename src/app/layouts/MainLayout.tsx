import { Toaster } from 'react-hot-toast';
import { Outlet } from 'react-router';

import { Footer, Header } from '@/widgets';
import './MainLayout.css';

export const MainLayout = () => {
  return (
    <div className='MainLayout'>
      <Header />
      <main className='MainLayout__content'>
        <Outlet />
      </main>
      <Footer />

      <Toaster position='bottom-right' />
    </div>
  );
};
