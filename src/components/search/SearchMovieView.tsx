import { useSearchContext } from '@/context/SearchContext';
import useDebounce from '@/hooks/use-debounce';
import { useMovies } from '@/hooks/use-movies';
import SearchBar from './SearchBar';
import SearchResults from './SearchResults';

const SearchMovieView = () => {
    const { searchQuery, updateSearchQuery } = useSearchContext();

    const debouncedSearchQuery = useDebounce<string>(searchQuery, 1000);

    const { data } = useMovies(debouncedSearchQuery);

    const movies = data?.searchMovies || [];

    return (
        <>
            <SearchBar value={searchQuery} onChange={updateSearchQuery} />
            <SearchResults data={movies} />
        </>
    );
};

export default SearchMovieView;
