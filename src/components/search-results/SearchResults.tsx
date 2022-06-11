import { useSearchContext } from '@/context/SearchContext';
import useDebounce from '@/hooks/use-debounce';
import { Grid } from '@mui/material';
import request, { RequestDocument } from 'graphql-request';
import { useMemo } from 'react';
import useSWR from 'swr';
import SearchResult from './SearchResult';

export interface Movie {
    id: string;
    name: string;
    score: number;
    releaseDate: string;
    poster: {
        medium: string;
    };
    recommended?: Movie[];
}

interface Result {
    searchMovies: Movie[];
}

interface RelatedMovieResult {
    movie: Movie;
}

interface QueryVariables {
    name: string;
}

interface RelatedMovieQueryVariables {
    id: string;
}

const fetcher = (query: RequestDocument, variables: QueryVariables) =>
    request(`${import.meta.env.VITE_API_URL}`, query, variables);

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

const SearchResults = () => {
    const { searchQuery, relatedMode, selectedMovie } = useSearchContext();

    const debouncedSearchQuery = useDebounce<string>(searchQuery, 1000);

    const variables: QueryVariables | RelatedMovieQueryVariables = useMemo(() => {
        if (relatedMode && selectedMovie) {
            return {
                id: selectedMovie.id,
            };
        }
        return {
            name: debouncedSearchQuery,
        };
    }, [debouncedSearchQuery, relatedMode, selectedMovie]);

    const fetchKey = useMemo(() => {
        if (relatedMode && selectedMovie) {
            return [relatedMoviesQuery, variables];
        }

        return debouncedSearchQuery ? [searchMoviesQuery, variables] : null;
    }, [debouncedSearchQuery, searchMoviesQuery, variables, relatedMode, selectedMovie]);

    const { data } = useSWR<Result | RelatedMovieResult>(fetchKey, fetcher);

    const movies = useMemo(() => {
        if (relatedMode && data && 'movie' in data) {
            return data.movie.recommended;
        } else if (!relatedMode && data && 'searchMovies' in data) {
            return data.searchMovies;
        } else {
            return [];
        }
    }, [data, relatedMode]);

    return (
        <Grid container spacing={4}>
            {movies?.map((movie) => (
                <Grid item key={movie.id} xs={12} sm={6} md={4}>
                    <SearchResult movie={movie} />
                </Grid>
            ))}
        </Grid>
    );
};

export default SearchResults;
