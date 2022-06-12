import { useSearchContext } from '@/context/SearchContext';
import { Search as SearchIcon } from '@mui/icons-material';
import { Chip, InputAdornment, OutlinedInput, Stack, styled } from '@mui/material';
import { ChangeEvent, FC } from 'react';

interface SearchBarProps {
    value: string;
    placeholder?: string;
    onChange?: (value: string) => void;
}

const SearchBar: FC<SearchBarProps> = ({ value, onChange: onChangeProp, placeholder }) => {
    const { selectedMovie, updateRelatedMode, updateSelectedMovie } = useSearchContext();

    const onChange = (e: ChangeEvent<HTMLInputElement>) => {
        if (onChangeProp) {
            onChangeProp(e.target.value);
        }
    };

    const onDelete = () => {
        if (updateRelatedMode && updateSelectedMovie) {
            updateRelatedMode(false);
            updateSelectedMovie(undefined);
        }
    };

    const renderAdorment = () => (
        <InputAdornment position="start">
            <Stack spacing={1} direction="row">
                <SearchIcon />
                {selectedMovie && (
                    <>
                        <Chip
                            size="small"
                            label={`Related to ${selectedMovie.name}`}
                            color="primary"
                            onDelete={onDelete}
                        />
                        <Spacer />
                    </>
                )}
            </Stack>
        </InputAdornment>
    );

    return (
        <Input
            placeholder={placeholder}
            startAdornment={renderAdorment()}
            size="small"
            fullWidth
            value={value}
            onChange={onChange}
            notched={false}
            autoFocus
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

const Spacer = styled('span')(() => ({
    width: '1rem', // Keep distance from the chip
}));

export default SearchBar;
