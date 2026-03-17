import './Header.css';
import { useNavigate } from 'react-router';

import { LogoIcon, SunIcon } from '@/shared/assets';
import { Button } from '@/shared/components';

export const Header = () => {
  const navigate = useNavigate();

  return (
    <header className='Header'>
      <div className='Header__content'>
        <div className='Header__logo' onClick={() => navigate('/')}>
          <LogoIcon />
        </div>
        <div className='Header__actions'>
          <Button icon={<SunIcon />} />
          <Button text='РУ' />
        </div>
      </div>
    </header>
  );
};
