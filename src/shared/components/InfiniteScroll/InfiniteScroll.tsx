import { useEffect, useRef, type ReactNode } from 'react';
import { useTranslation } from 'react-i18next';

import { Button } from '../Button/Button';

import './InfiniteScroll.css';

interface InfiniteScrollProps {
  hasMore: boolean;
  isLoadingMore: boolean;
  hasError?: boolean;
  onLoadMore: () => void;
  onRetry?: () => void;
  loader?: ReactNode;
}

export const InfiniteScroll = ({
  hasMore,
  isLoadingMore,
  hasError,
  onLoadMore,
  onRetry,
  loader
}: InfiniteScrollProps) => {
  const { t } = useTranslation();
  const sentinelRef = useRef<HTMLDivElement | null>(null);

  const onLoadMoreRef = useRef(onLoadMore);

  useEffect(() => {
    onLoadMoreRef.current = onLoadMore;
  }, [onLoadMore]);

  const lockRef = useRef(false);

  useEffect(() => {
    if (hasError) return;

    const node = sentinelRef.current;
    if (!node) return;

    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return;
      if (!hasMore || isLoadingMore) return;
      if (lockRef.current) return;

      lockRef.current = true;
      onLoadMoreRef.current();
    });

    observer.observe(node);

    return () => observer.disconnect();
  }, [hasMore, isLoadingMore, hasError]);

  useEffect(() => {
    if (!isLoadingMore) {
      lockRef.current = false;
    }
  }, [isLoadingMore]);

  const renderContent = () => {
    if (hasError && onRetry) {
      return (
        <div className='InfiniteScroll__error'>
          <p className='InfiniteScroll__errorText'>
            {t('common.loadingFailed')}
          </p>
          <Button
            text={t('common.retry')}
            onClick={onRetry}
            className='InfiniteScroll__retryButton'
          />
        </div>
      );
    }

    if (isLoadingMore) return loader;

    return null;
  };

  return <div ref={sentinelRef}>{renderContent()}</div>;
};
