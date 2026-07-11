import { Link } from 'react-router';

import { LogoIcon } from '@/shared/assets';

import { FavoriteCharacters } from '../FavoriteCharacters/FavoriteCharacters';
import { LanguageSwitcher } from '../LanguageSwitcher/LanguageSwitcher';
import { ThemeSwitcher } from '../ThemeSwitcher/ThemeSwitcher';

import './Header.scss';

export const Header = () => {
  return (
    <header className='Header'>
      <nav className='Header__content'>
        <Link className='Header__logo' to='/'>
          <LogoIcon />
        </Link>
        <div className='Header__actions'>
          <FavoriteCharacters />
          <ThemeSwitcher />
          <LanguageSwitcher />
        </div>
      </nav>
    </header>
  );
};
