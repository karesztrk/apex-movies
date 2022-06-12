import { Search as SearchIcon } from '@mui/icons-material';
import { InputAdornment, OutlinedInput, styled } from '@mui/material';
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
        <Input
            placeholder="Find your favourite movie"
            startAdornment={
                <InputAdornment position="start">
                    <SearchIcon />
                </InputAdornment>
            }
            size="small"
            fullWidth
            value={value}
            onChange={onChange}
            notched={false}
        />
    );
};

const Input = styled(OutlinedInput)(({ theme }) => ({
    color: theme.palette.grey[500],
    marginBottom: '5rem',

    '& fieldset.MuiOutlinedInput-notchedOutline': {
        border: `1px solid ${theme.palette.grey[500]}`,
    },
    '& svg': {
        color: `${theme.palette.grey[500]}`,
    },
    '&:hover, &:focus-within': {
        color: theme.palette.common.white,
        '& fieldset.MuiOutlinedInput-notchedOutline': {
            border: `1px solid ${theme.palette.common.white}`,
        },
        '& svg': {
            color: theme.palette.common.white,
        },
    },
    '& input:focus-within + fieldset.MuiOutlinedInput-notchedOutline': {
        border: `2px solid ${theme.palette.primary.main}`,
    },
}));

export default SearchBar;
