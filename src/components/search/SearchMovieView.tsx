import { useSearchContext } from '@/context/SearchContext';
import useDebounce from '@/hooks/use-debounce';
import { useMovies } from '@/hooks/use-movies';
import ProgressBar from '../progress-bar/ProgressBar';
import SearchBar from './SearchBar';
import SearchResults from './SearchResults';

const SearchMovieView = () => {
    const { searchQuery, updateSearchQuery } = useSearchContext();

    const debouncedSearchQuery = useDebounce<string>(searchQuery, 1000);

    const { data } = useMovies(debouncedSearchQuery);

    const loading = data === undefined && debouncedSearchQuery;
    return (
        <>
            <SearchBar value={searchQuery} onChange={updateSearchQuery} placeholder="Find your favourite movie" />
            {loading ? <ProgressBar /> : <SearchResults data={data?.searchMovies || []} />}
        </>
    );
};

export default SearchMovieView;
