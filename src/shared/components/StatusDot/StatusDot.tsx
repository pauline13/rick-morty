import { classNames } from '@/shared/helpers';
import type { Status } from '@/shared/types';

import './StatusDot.css';

const STATUS_COLOR: Record<Status, string> = {
  alive: 'green',
  dead: 'red',
  unknown: 'orange'
};

interface StatusDotProps {
  status: Status;
}

export const StatusDot = ({ status }: StatusDotProps) => {
  const color = STATUS_COLOR[status];

  return <div className={classNames('StatusDot', `StatusDot_${color}`)} />;
};
