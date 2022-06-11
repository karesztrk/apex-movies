import { Movie } from '@/components/search-results/SearchResults';
import React, { createContext, PropsWithChildren, useContext, useMemo, useState } from 'react';

interface ContextType {
    searchQuery: string;
    updateSearchQuery?: (searchQuery: string) => void;
    relatedMode: boolean;
    updateRelatedMode?: (relatedMode: boolean) => void;
    selectedMovie?: Movie;
    updateSelectedMovie?: (selectedMovie?: Movie) => void;
}

const SearchContext = createContext<ContextType>({
    searchQuery: '',
    relatedMode: false,
});

const SearchProvider = ({ children }: PropsWithChildren) => {
    const [searchQuery, setSearchQuery] = useState<string>('');
    const [relatedMode, setRelatedMode] = useState(false);
    const [selectedMovie, setSelectedMovie] = useState<Movie>();

    const value = useMemo(
        () => ({
            searchQuery,
            updateSearchQuery: setSearchQuery,
            relatedMode,
            updateRelatedMode: setRelatedMode,
            selectedMovie,
            updateSelectedMovie: setSelectedMovie,
        }),
        [searchQuery, relatedMode, selectedMovie],
    );

    return <SearchContext.Provider value={value}>{children}</SearchContext.Provider>;
};

const useSearchContext = () => useContext(SearchContext);

export { SearchContext, SearchProvider, useSearchContext };
