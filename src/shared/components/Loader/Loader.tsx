import { loaderImage } from '@/shared/assets';
import { classNames } from '@/shared/helpers';
import './Loader.css';

interface LoaderProps {
  size?: 'xl' | 'sm';
  text?: string;
  className?: string;
}

export const Loader = ({ size = 'sm', text, className }: LoaderProps) => {
  return (
    <div className={classNames('Loader', `Loader_${size}`, className)}>
      <img src={loaderImage} alt='loader' className='Loader__img' />
      {text && <p className='Loader__text'>{text}</p>}
    </div>
  );
};
