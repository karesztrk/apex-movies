import { imdbFetcher } from '@/util/fetcher';
import useSWRImmutable from 'swr/immutable';

export const useImdb = (name?: string, releaseDate?: Date) => {
    return useSWRImmutable(
        () =>
            name && releaseDate
                ? `${import.meta.env.VITE_IMDB_API_URL}/${
                      import.meta.env.VITE_IMDB_API_KEY
                  }/${name} ${releaseDate.getFullYear()}`
                : null,
        imdbFetcher,
    );
};
