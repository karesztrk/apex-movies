import { useSearchContext } from '@/context/SearchContext';
import React from 'react';
import SearchRelatedView from './SearchRelatedView';
import SearchMovieView from './SearchMovieView';

const Search = () => {
    const { relatedMode } = useSearchContext();

    return relatedMode ? <SearchRelatedView /> : <SearchMovieView />;
};

export default Search;
