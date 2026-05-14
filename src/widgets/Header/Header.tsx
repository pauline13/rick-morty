import { Link } from 'react-router';

import { LogoIcon, SunIcon } from '@/shared/assets';
import { Button } from '@/shared/components';
import './Header.css';

export const Header = () => {
  return (
    <header className='Header'>
      <nav className='Header__content'>
        <Link className='Header__logo' to='/'>
          <LogoIcon />
        </Link>
        <div className='Header__actions'>
          <Button icon={<SunIcon />} />
          <Button text='РУ' />
        </div>
      </nav>
    </header>
  );
};
