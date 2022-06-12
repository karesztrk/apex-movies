import { Movie } from '@/components/search';
import { apiFetcher } from '@/util/fetcher';
import useSWR from 'swr';

interface Result {
    movie: Movie;
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
    const fetchKey = movie ? [relatedMoviesQuery, movie.id] : null;
    console.log('🚀 ~ file: use-related-movies.ts ~ line 34 ~ useRelatedMovies ~ fetchKey', fetchKey);
    return useSWR<Result>(fetchKey, (url, value) => apiFetcher(url, { id: value }));
};
