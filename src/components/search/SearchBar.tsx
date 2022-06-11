import { TextField } from '@mui/material';
import { ChangeEvent, FC } from 'react';

interface SearchBarProps {
    value: string;
    onChange?: (value: string) => void;
}

const SearchBar: FC<SearchBarProps> = ({ value, onChange: onChangeProp }) => {
    const onChange = (e: ChangeEvent<HTMLInputElement>) => {
        if (onChangeProp) {
            onChangeProp(e.target.value);
        }
    };

    return (
        <TextField
            hiddenLabel
            placeholder="Find your favourite movie"
            variant="outlined"
            size="small"
            fullWidth
            value={value}
            onChange={onChange}
        />
    );
};

export default SearchBar;
