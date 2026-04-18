import './EmptyState.css';

type EmptyStateProps = {
  title: string;
};

export const EmptyState = ({ title }: EmptyStateProps) => {
  return (
    <section className='EmptyState'>
      <h3 className='EmptyState__title'>{title}</h3>
    </section>
  );
};
