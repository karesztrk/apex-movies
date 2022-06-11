import { Movie } from '@/components/search';
import { apiFetcher } from '@/util/fetcher';
import useSWR from 'swr';

interface Result {
    movie: Movie;
}

interface QueryVariables {
    id: string;
}

const relatedMoviesQuery = `
query getMovie($id: ID!) {
  movie(id: $id) {
    id
    name
    score
    releaseDate
    poster {
      medium
    }
    recommended { 
      id
      name
      score
      releaseDate
      poster {
        medium
      }
    }
  }
}
`;

export const useRelatedMovies = (movie: Movie) => {
    const variables: QueryVariables = {
        id: movie.id,
    };

    const fetchKey = movie ? [relatedMoviesQuery, variables] : null;
    return useSWR<Result>(fetchKey, apiFetcher);
};
