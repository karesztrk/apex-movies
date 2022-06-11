import { Movie } from '@/components/search';
import { apiFetcher } from '@/util/fetcher';
import useSWR from 'swr';

interface Result {
    searchMovies: Movie[];
}

interface QueryVariables {
    name: string;
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
    const variables: QueryVariables = {
        name: query,
    };

    const fetchKey = query ? [searchMoviesQuery, variables] : null;
    return useSWR<Result>(fetchKey, apiFetcher);
};
