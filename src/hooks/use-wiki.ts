import { wikiFetcher } from '@/util/fetcher';
import useSWRImmutable from 'swr/immutable';

export const useWiki = (name?: string) => {
    const params = {
        origin: '*',
        format: 'json',
        action: 'query',
        prop: 'extracts',
        titles: name || '',
        exintro: '',
        explaintext: '',
    };

    const searchParams = new URLSearchParams(params).toString();

    return useSWRImmutable(() => (name ? `${import.meta.env.VITE_WIKI_API_URL}?${searchParams}` : null), wikiFetcher);
};
