import { useEffect } from 'react';

export function useInfiniteScroll(
    loadMore: () => void,
    loading: boolean,
    hasMore: boolean
) {
    useEffect(() => {
        const onScroll = () => {
            if (
                window.innerHeight + window.scrollY >=
                document.documentElement.scrollHeight - 200 &&
                !loading &&
                hasMore
            ) {
                loadMore();
            }
        };

        window.addEventListener('scroll', onScroll);
        return () => window.removeEventListener('scroll', onScroll);
    }, [loading, hasMore, loadMore]);
}
