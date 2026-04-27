import { useEffect, useRef, type ReactNode } from 'react';

interface InfiniteScrollProps {
  hasMore: boolean;
  isLoadingMore: boolean;
  onLoadMore: () => void;
  loader?: ReactNode;
}

export const InfiniteScroll = ({
  hasMore,
  isLoadingMore,
  onLoadMore,
  loader
}: InfiniteScrollProps) => {
  const sentinelRef = useRef<HTMLDivElement | null>(null);

  const onLoadMoreRef = useRef(onLoadMore);

  useEffect(() => {
    onLoadMoreRef.current = onLoadMore;
  }, [onLoadMore]);

  const lockRef = useRef(false);

  useEffect(() => {
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
  }, [hasMore, isLoadingMore]);

  useEffect(() => {
    if (!isLoadingMore) {
      lockRef.current = false;
    }
  }, [isLoadingMore]);

  return <div ref={sentinelRef}>{isLoadingMore ? loader : null}</div>;
};
