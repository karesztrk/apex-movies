import { useSearchContext } from '@/context/SearchContext';
import useDebounce from '@/hooks/use-debounce';
import request, { RequestDocument } from 'graphql-request';
import useSWR from 'swr';
import { Movie } from '.';
import SearchBar from './SearchBar';
import SearchResults from './SearchResults';

interface Result {
    searchMovies: Movie[];
}

interface QueryVariables {
    name: string;
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

const SearchMovieView = () => {
    const { searchQuery, updateSearchQuery } = useSearchContext();

    const debouncedSearchQuery = useDebounce<string>(searchQuery, 1000);

    const variables: QueryVariables = {
        name: debouncedSearchQuery,
    };

    const fetchKey = debouncedSearchQuery ? [searchMoviesQuery, variables] : null;

    const { data } = useSWR<Result>(fetchKey, fetcher);

    const movies = data?.searchMovies || [];

    return (
        <>
            <SearchBar value={searchQuery} onChange={updateSearchQuery} />
            <SearchResults data={movies} />
        </>
    );
};

export default SearchMovieView;
