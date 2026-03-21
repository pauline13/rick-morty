import './StatusDot.css';

const STATUS_COLOR = {
  alive: 'green',
  dead: 'red',
  unknown: 'orange'
};

export type Status = keyof typeof STATUS_COLOR;

type StatusDotProps = {
  status: Status;
};

export const StatusDot = ({ status }: StatusDotProps) => {
  const color = STATUS_COLOR[status];

  return <div className={`StatusDot StatusDot_${color}`} />;
};
