import { useNavigate } from 'react-router';

import { notFoundImage } from '@/shared/assets';
import { Button } from '@/shared/components';

import './NotFoundPage.css';

export const NotFoundPage = () => {
  const navigate = useNavigate();
  return (
    <section className='NotFoundPage'>
      <img src={notFoundImage} alt='Page not found' />
      <Button
        className='NotFoundPage__button'
        textClassName='NotFoundPage__buttonText'
        text='Go to main page'
        onClick={() => {
          navigate('/');
        }}
      />
    </section>
  );
};
