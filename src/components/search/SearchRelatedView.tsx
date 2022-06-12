import { useSearchContext } from '@/context/SearchContext';
import { useRelatedMovies } from '@/hooks/use-related-movies';
import { useState } from 'react';
import ProgressBar from '../progress-bar/ProgressBar';
import SearchBar from './SearchBar';
import SearchResults from './SearchResults';

const SearchRelatedView = () => {
    const [searchQuery, setSearchQuery] = useState('');

    const { selectedMovie } = useSearchContext();

    const { data } = useRelatedMovies(selectedMovie);

    const movies =
        data?.movie?.recommended?.filter((movie) =>
            movie.name.toLowerCase().includes(searchQuery.toLocaleLowerCase()),
        ) || [];

    const loading = data === undefined;

    return (
        <>
            <SearchBar
                value={searchQuery}
                onChange={setSearchQuery}
                placeholder="Find movies related to your selection"
            />
            {loading ? <ProgressBar /> : <SearchResults data={movies} />}
        </>
    );
};

export default SearchRelatedView;
