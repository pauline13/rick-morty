import { Toaster } from 'react-hot-toast';
import { Outlet } from 'react-router';

import { Footer, Header } from '@/widgets';
import './MainLayout.scss';

export const MainLayout = () => {
  return (
    <div className='MainLayout'>
      <div className='MainLayout__header'>
        <Header />
      </div>
      <main className='MainLayout__content'>
        <Outlet />
      </main>
      <div className='MainLayout__footer'>
        <Footer />
      </div>
      <Toaster
        position='bottom-right'
        toastOptions={{ className: 'MainLayout__toast' }}
      />
    </div>
  );
};
