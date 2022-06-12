import { Movie } from '@/components/search';
import { apiFetcher } from '@/util/fetcher';
import useSWRImmutable from 'swr/immutable';

interface Result {
    searchMovies: Movie[];
}

const searchMoviesQuery = `
query SearchMovies($name: String!) {
  searchMovies(query: $name) {
    id
    name
    score
    releaseDate
    poster {
      medium
    }
  }
}
`;

export const useMovies = (query: string) => {
    const fetchKey = query ? [searchMoviesQuery, query] : null;
    return useSWRImmutable<Result>(fetchKey, (url, value) => apiFetcher(url, { name: value }));
};
