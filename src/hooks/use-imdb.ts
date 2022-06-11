import { imdbFetcher } from '@/util/fetcher';
import useSWR from 'swr';

export const useImdb = (name?: string, releaseDate?: Date) => {
    return useSWR(
        () =>
            name && releaseDate
                ? `${import.meta.env.VITE_IMDB_API_URL}/${
                      import.meta.env.VITE_IMDB_API_KEY
                  }/${name} ${releaseDate.getFullYear()}`
                : null,
        imdbFetcher,
    );
};
