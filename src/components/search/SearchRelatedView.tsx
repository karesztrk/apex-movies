import { useSearchContext } from '@/context/SearchContext';
import { useRelatedMovies } from '@/hooks/use-related-movies';
import { Button, styled, Typography } from '@mui/material';
import { PropsWithChildren, useState } from 'react';
import ProgressBar from '../progress-bar/ProgressBar';
import SearchBar from './SearchBar';
import SearchResults from './SearchResults';

const SearchRelatedView = () => {
    const [searchQuery, setSearchQuery] = useState('');

    const { selectedMovie, updateRelatedMode, updateSelectedMovie } = useSearchContext();

    const { data } = useRelatedMovies(selectedMovie);

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

    const loading = data === undefined;

    return (
        <>
            <Title>{selectedMovie.name}</Title>
            <Button onClick={onBackClick}>Back</Button>
            <SearchBar
                value={searchQuery}
                onChange={setSearchQuery}
                placeholder="Find movies related to your selection"
            />
            {loading ? <ProgressBar /> : <SearchResults data={movies} />}
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
