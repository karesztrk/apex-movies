import { Movie } from '@/components/search';
import { apiFetcher } from '@/util/fetcher';
import useSWR from 'swr';

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
    console.log('🚀 ~ file: use-movies.ts ~ line 25 ~ useMovies ~ fetchKey', fetchKey);
    return useSWR<Result>(fetchKey, (url, value) => apiFetcher(url, { name: value }));
};
