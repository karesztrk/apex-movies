import { useSearchContext } from '@/context/SearchContext';
import { useImdb } from '@/hooks/use-imdb';
import { useWiki } from '@/hooks/use-wiki';
import { Button, Card, CardActions, CardContent, CardMedia, Link, Rating, styled, Typography } from '@mui/material';
import { FC, PropsWithChildren, useState } from 'react';
import { Movie } from '.';

interface SearchResultProps {
    movie: Movie;
}

const SearchResult: FC<SearchResultProps> = ({ movie }) => {
    const { updateRelatedMode, updateSelectedMovie, updateSearchQuery } = useSearchContext();
    const [open, setOpen] = useState(false);

    const { data: wiki } = useWiki(open ? movie.name : undefined);
    const { data: imdb } = useImdb(open ? movie.name : undefined, open ? new Date(movie.releaseDate) : undefined);

    const onTitleClick = () => {
        setOpen(!open);
    };

    const onRelatedClick = () => {
        if (updateRelatedMode && updateSelectedMovie && updateSearchQuery) {
            updateRelatedMode(true);
            updateSelectedMovie(movie);
        }
    };

    const rating = movie.score / 2;

    return (
        <Wrapper>
            <CardMedia component="img" image={movie.poster?.medium} alt="Movie poster" />
            <CardContent>
                <Typography variant="h5" component="h2" onClick={onTitleClick}>
                    {movie.name}
                </Typography>
                <Rating name="read-only" value={rating} readOnly />
                {wiki?.extract && <Summary>{wiki?.extract}</Summary>}
            </CardContent>
            {(wiki?.pageid || imdb?.id) && (
                <CardActions>
                    <Button onClick={onRelatedClick}>Releated</Button>
                    {wiki?.pageid && (
                        <Link target="_blank" rel="noreferrer" href={`https://en.wikipedia.org/?curid=${wiki.pageid}`}>
                            Wiki
                        </Link>
                    )}
                    {imdb?.id && (
                        <Link target="_blank" rel="noreferrer" href={`https://www.imdb.com/title/${imdb.id}`}>
                            Imdb
                        </Link>
                    )}
                </CardActions>
            )}
        </Wrapper>
    );
};

const Wrapper = styled(({ children, className }: PropsWithChildren<{ className?: string }>) => (
    <Card elevation={1} className={className}>
        {children}
    </Card>
))(() => ({
    borderRadius: '0.75rem',
}));

const Summary = styled(Typography)(() => ({
    textAlign: 'center',
    display: '-webkit-box',
    WebkitLineClamp: '5',
    WebkitBoxOrient: 'vertical',
    overflow: 'hidden',
}));

export default SearchResult;
