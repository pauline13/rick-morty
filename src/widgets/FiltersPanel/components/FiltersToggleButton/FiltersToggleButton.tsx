import { useTranslation } from 'react-i18next';

import { ArrowDownIcon } from '@/shared/assets';
import { classNames } from '@/shared/helpers';

import './FiltersToggleButton.scss';

type FiltersToggleButtonProps = {
  isExpanded: boolean;
  onClick: () => void;
};

export const FiltersToggleButton = ({
  isExpanded,
  onClick
}: FiltersToggleButtonProps) => {
  const { t } = useTranslation();

  return (
    <button
      type='button'
      className='FiltersToggleButton'
      aria-expanded={isExpanded}
      onClick={onClick}
    >
      <ArrowDownIcon
        className={classNames('FiltersToggleButton__icon', {
          FiltersToggleButton__icon_expanded: isExpanded
        })}
        width={32}
        height={32}
      />
      <span className='FiltersToggleButton__label'>
        {isExpanded ? t('filters.lessFilters') : t('filters.moreFilters')}
      </span>
    </button>
  );
};
