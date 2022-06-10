import { SearchProvider } from '@/context/SearchContext';
import { Container, Typography } from '@mui/material';
import { styled } from '@mui/system';
import React, { FC, PropsWithChildren } from 'react';
import SearchBar from '../search-bar/SearchBar';
import SearchResults from '../search-results/SearchResults';

const Main = () => {
    return (
        <Container component="main" maxWidth="md">
            <Title>Find your favourite movie</Title>
            <SearchProvider>
                <SearchBar />
                <SearchResults />
            </SearchProvider>
        </Container>
    );
};

const Title = styled(({ children, className }: PropsWithChildren<{ className?: string }>) => (
    <Typography component="h1" variant="h2" className={className}>
        {children}
    </Typography>
))(() => ({
    textAlign: 'center',
}));

export default Main;
