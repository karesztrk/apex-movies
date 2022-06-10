import React, { createContext, PropsWithChildren, useContext, useMemo, useState } from 'react';

interface ContextType {
    searchQuery: string;
    onSearchQueryChange?: (searchQuery: string) => void;
}

const SearchContext = createContext<ContextType>({
    searchQuery: '',
});

const SearchProvider = ({ children }: PropsWithChildren) => {
    const [searchQuery, setSearchQuery] = useState<string>('');

    const value = useMemo(() => ({ searchQuery, onSearchQueryChange: setSearchQuery }), [searchQuery]);

    return <SearchContext.Provider value={value}>{children}</SearchContext.Provider>;
};

const useSearchContext = () => useContext(SearchContext);

export { SearchContext, SearchProvider, useSearchContext };
