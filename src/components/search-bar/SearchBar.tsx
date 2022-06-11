import { useSearchContext } from '@/context/SearchContext';
import { FormControlLabel, FormGroup, Switch, TextField } from '@mui/material';
import { ChangeEvent } from 'react';

const SearchBar = () => {
    const { searchQuery, updateSearchQuery, relatedMode, updateRelatedMode, updateSelectedMovie, selectedMovie } =
        useSearchContext();

    const onChange = (e: ChangeEvent<HTMLInputElement>) => {
        if (updateSearchQuery) {
            updateSearchQuery(e.target.value);
        }
    };

    const onSwitchChange = (event: ChangeEvent<HTMLInputElement>) => {
        const { checked } = event.target;
        if (updateRelatedMode) {
            updateRelatedMode(checked);
        }
        if (!checked && updateSelectedMovie) {
            updateSelectedMovie(undefined);
        }
    };

    return (
        <>
            <TextField
                hiddenLabel
                placeholder="Find your favourite movie"
                variant="outlined"
                size="small"
                fullWidth
                value={searchQuery}
                onChange={onChange}
                disabled={relatedMode}
            />
            {relatedMode && selectedMovie && (
                <FormGroup>
                    <FormControlLabel
                        control={<Switch checked={relatedMode} onChange={onSwitchChange} />}
                        label={`Related to ${selectedMovie.name}`}
                    />
                </FormGroup>
            )}
        </>
    );
};

export default SearchBar;
