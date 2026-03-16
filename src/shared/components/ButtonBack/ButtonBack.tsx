import { ArrowBackIcon } from '@/shared/assets';
import './ButtonBack.css';

interface ButtonBackProps {
  text?: string;
  onClick?: () => void;
}

export const ButtonBack = ({ text = 'GO BACK', onClick }: ButtonBackProps) => {
  return (
    <button className='ButtonBack' onClick={onClick}>
      <ArrowBackIcon />
      {text && <span className='ButtonBack__text'>{text}</span>}
    </button>
  );
};
