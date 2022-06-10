import { useSearchContext } from '@/context/SearchContext';
import useDebounce from '@/hooks/use-debounce';
import { Button, Card, CardActions, CardContent, CardMedia, Grid, Typography } from '@mui/material';
import request, { RequestDocument } from 'graphql-request';
import React, { useMemo } from 'react';
import useSWR from 'swr';

interface Movie {
    id: string;
    name: string;
    overview: string;
    releaseDate: Date;
    poster: {
        medium: string;
    };
}

interface Result {
    searchMovies: Movie[];
}

interface QueryVariables {
    name: string;
}

const fetcher = (query: RequestDocument, variables: QueryVariables) =>
    request(`${import.meta.env.VITE_API_URL}`, query, variables);

const discoverMoviesQuery = `
query SearchMovies($name: String!) {
  searchMovies(query: $name) {
    id
    name
    overview
    releaseDate
    poster {
      medium
    }
  }
}
`;

const SearchResults = () => {
    const { searchQuery } = useSearchContext();

    const debouncedSearchQuery = useDebounce<string>(searchQuery, 1000);

    const variables: QueryVariables = useMemo(
        () => ({
            name: debouncedSearchQuery,
        }),
        [debouncedSearchQuery],
    );

    const fetchKey = debouncedSearchQuery ? [discoverMoviesQuery, variables] : null;

    const { data } = useSWR<Result>(fetchKey, fetcher);
    const movies = data?.searchMovies || [];

    return (
        <Grid container spacing={4}>
            {movies.map((movie) => (
                <Grid item key={movie.id} xs={12} sm={6} md={4}>
                    <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                        <CardMedia component="img" image={movie.poster?.medium} alt="random" />
                        <CardContent sx={{ flexGrow: 1 }}>
                            <Typography gutterBottom variant="h5" component="h2">
                                {movie.name}
                            </Typography>
                            <Typography>{movie.overview}</Typography>
                        </CardContent>
                        <CardActions>
                            <Button size="small">View</Button>
                            <Button size="small">Edit</Button>
                        </CardActions>
                    </Card>
                </Grid>
            ))}
        </Grid>
    );
};

export default SearchResults;
