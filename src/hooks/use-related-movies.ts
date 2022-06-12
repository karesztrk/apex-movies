import { Movie } from '@/components/search';
import { apiFetcher } from '@/util/fetcher';
import useSWRImmutable from 'swr/immutable';

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
    return useSWRImmutable<Result>(fetchKey, (url, value) => apiFetcher(url, { id: value }));
};
