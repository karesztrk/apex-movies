import { Box, Container, Typography } from '@mui/material';
import { styled } from '@mui/system';
import { PropsWithChildren } from 'react';

const Layout = ({ children }: PropsWithChildren) => {
    return (
        <>
            <Hero>
                <Title>Apex Movies</Title>
                <CTA>Looking for a movie?</CTA>
                <Description>
                    Search for a move title, find any categories, browse it&apos;s Wiki or Imdb page
                </Description>
            </Hero>
            <Content>{children}</Content>
        </>
    );
};

const Title = styled(({ children, className }: PropsWithChildren<{ className?: string }>) => (
    <Typography component="h1" variant="h5" className={className}>
        {children}
    </Typography>
))(() => ({
    textAlign: 'center',
    color: 'inherit',
    textTransform: 'uppercase',
    fontWeight: 'bold',
}));

const CTA = styled(({ children, className }: PropsWithChildren<{ className?: string }>) => (
    <Typography component="h2" variant="h2" className={className}>
        {children}
    </Typography>
))(() => ({
    textAlign: 'center',
    color: 'inherit',
    fontWeight: 'bold',
    marginBottom: '1rem',
}));

const Description = styled(({ children, className }: PropsWithChildren<{ className?: string }>) => (
    <Typography className={className}>{children}</Typography>
))(() => ({
    textAlign: 'center',
    color: 'inherit',
    fontWeight: 300,
}));

const Hero = styled(Box)(({ theme }) => ({
    paddingTop: '5rem',
    paddingBottom: '20rem',
    backgroundColor: theme.palette.secondary.main,
    color: theme.palette.common.white,
}));

const Content = styled(({ children, className }: PropsWithChildren<{ className?: string }>) => (
    <Container component="main" maxWidth="md" className={className}>
        {children}
    </Container>
))(() => ({
    marginTop: '-16rem',
}));

export default Layout;
