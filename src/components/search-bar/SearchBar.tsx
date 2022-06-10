import { useSearchContext } from '@/context/SearchContext';
import { TextField } from '@mui/material';
import { ChangeEvent } from 'react';

const SearchBar = () => {
    const { searchQuery, onSearchQueryChange } = useSearchContext();

    const onChange = (e: ChangeEvent<HTMLInputElement>) => {
        if (onSearchQueryChange) {
            onSearchQueryChange(e.target.value);
        }
    };

    return (
        <TextField
            hiddenLabel
            placeholder="Find your favourite movie"
            variant="outlined"
            size="small"
            fullWidth
            value={searchQuery}
            onChange={onChange}
        />
    );
};

export default SearchBar;
