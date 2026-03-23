import { LoaderIcon } from '@/shared/assets';
import { classNames } from '@/shared/helpers';
import './Loader.css';

interface LoaderProps {
  size?: 'xl' | 'sm';
  text?: string;
}

export const Loader = ({ size = 'sm', text }: LoaderProps) => {
  return (
    <div className={classNames('Loader', `Loader_${size}`)}>
      <LoaderIcon className='Loader__icon' />
      {text && <p className='Loader__text'>{text}</p>}
    </div>
  );
};
