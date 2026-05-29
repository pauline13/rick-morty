import { Link } from 'react-router';

import { LogoIcon, MoonIcon, SunIcon } from '@/shared/assets';
import { Button } from '@/shared/components';
import { useThemeStore } from '@/stores';
import './Header.css';

export const Header = () => {
  const { theme, toggleTheme } = useThemeStore();

  const themeIcon = theme === 'dark' ? <MoonIcon /> : <SunIcon />;

  return (
    <header className='Header'>
      <nav className='Header__content'>
        <Link className='Header__logo' to='/'>
          <LogoIcon />
        </Link>
        <div className='Header__actions'>
          <Button icon={themeIcon} onClick={toggleTheme} />
          <Button text='РУ' />
        </div>
      </nav>
    </header>
  );
};
