import { Grid } from '@mui/material';
import { FC } from 'react';
import { Movie } from '.';
import SearchResult from '../search/SearchResult';

interface SearchResultsProps {
    data: Movie[];
}

const SearchResults: FC<SearchResultsProps> = ({ data }) => {
    return (
        <Grid container spacing={4}>
            {data.map((entry) => (
                <Grid item key={entry.id} xs={12} sm={6} md={4}>
                    <SearchResult data={entry} />
                </Grid>
            ))}
        </Grid>
    );
};

export default SearchResults;
