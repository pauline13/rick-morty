import { LogoXlIcon } from '@/shared/assets';
import './CharactersPage.css';
import { useNavigate } from 'react-router';

export const CharactersPage = () => {
  const navigate = useNavigate();

  return (
    <div className='CharactersPage'>
      <div
        className='CharactersPage__logo'
        onClick={() => navigate('/character-info')}
      >
        <LogoXlIcon />
      </div>
    </div>
  );
};
