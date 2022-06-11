import { useSearchContext } from '@/context/SearchContext';
import { Button, styled, Typography } from '@mui/material';
import request, { RequestDocument } from 'graphql-request';
import { PropsWithChildren, useState } from 'react';
import useSWR from 'swr';
import { Movie } from '.';
import SearchBar from './SearchBar';
import SearchResults from './SearchResults';

interface Result {
    movie: Movie;
}

interface QueryVariables {
    id: string;
}

const fetcher = (query: RequestDocument, variables: QueryVariables) =>
    request(`${import.meta.env.VITE_API_URL}`, query, variables);

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

const SearchRelatedView = () => {
    const [searchQuery, setSearchQuery] = useState('');

    const { selectedMovie, updateRelatedMode, updateSelectedMovie } = useSearchContext();

    const variables: QueryVariables = {
        id: selectedMovie.id,
    };

    const fetchKey = selectedMovie ? [relatedMoviesQuery, variables] : null;

    const { data } = useSWR<Result>(fetchKey, fetcher);

    const movies =
        data?.movie?.recommended?.filter((movie) =>
            movie.name.toLowerCase().includes(searchQuery.toLocaleLowerCase()),
        ) || [];

    const onBackClick = () => {
        if (updateRelatedMode && updateSelectedMovie) {
            updateRelatedMode(false);
            updateSelectedMovie(undefined);
        }
    };

    return (
        <>
            <Title>{selectedMovie.name}</Title>
            <Button onClick={onBackClick}>Back</Button>
            <SearchBar value={searchQuery} onChange={setSearchQuery} />
            <SearchResults data={movies} />
        </>
    );
};

const Title = styled(({ children, className }: PropsWithChildren<{ className?: string }>) => (
    <Typography component="h2" variant="h3" className={className}>
        {children}
    </Typography>
))(() => ({
    textAlign: 'center',
}));

export default SearchRelatedView;
