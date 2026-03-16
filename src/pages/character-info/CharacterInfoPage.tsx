import { useNavigate } from 'react-router';

import { ButtonBack, Loader } from '@/shared/components';
import './CharacterInfoPage.css';

export const CharacterInfoPage = () => {
  const navigate = useNavigate();

  return (
    <section className='CharacterInfoPage'>
      <ButtonBack onClick={() => navigate('/')} />
      <div className='CharacterInfoPage__loader'>
        <Loader size='xl' text='Loading character card...' />
      </div>
    </section>
  );
};
