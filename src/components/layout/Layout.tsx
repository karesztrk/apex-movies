import { Container, Typography } from '@mui/material';
import { styled } from '@mui/system';
import { PropsWithChildren } from 'react';

const Layout = ({ children }) => {
    return (
        <Container component="main" maxWidth="md">
            <Title>Find your favourite movie</Title>
            {children}
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

export default Layout;
