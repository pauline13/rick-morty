import './Loader.css';
import { LoaderIcon } from '@/shared/assets';

type LoaderProps = {
  size?: 'xl' | 'sm';
  text?: string;
};

export const Loader = ({ size = 'sm', text }: LoaderProps) => {
  return (
    <div className={`Loader Loader_${size}`}>
      <LoaderIcon className='Loader__icon' />
      {text && <p className='Loader__text'>{text}</p>}
    </div>
  );
};
