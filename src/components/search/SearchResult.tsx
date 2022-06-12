import { useSearchContext } from '@/context/SearchContext';
import { useImdb } from '@/hooks/use-imdb';
import { useWiki } from '@/hooks/use-wiki';
import { SavedSearch as SavedSearchIcon, Public as PublicIcon, Movie as MovieIcon } from '@mui/icons-material';
import {
    Button,
    Card,
    CardActionArea,
    CardActions,
    CardContent,
    CardMedia,
    IconButton,
    Link,
    Rating,
    Skeleton,
    styled,
    Tooltip,
    Typography,
} from '@mui/material';
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

    const onClick = () => {
        setOpen(!open);
    };

    const onRelatedClick = () => {
        if (updateRelatedMode && updateSelectedMovie && updateSearchQuery) {
            updateRelatedMode(true);
            updateSelectedMovie(movie);
        }
    };

    const rating = movie.score / 2;

    const renderSummarySkeleton = () => {
        return Array(3)
            .fill(0)
            .map((_, i) => <Skeleton key={i} variant="text" width="100%" />);
    };

    return (
        <Wrapper>
            <CardActionArea onClick={onClick}>
                <Poster image={movie.poster?.medium} alt="Movie poster" />
                <CardContent>
                    <Title>{movie.name}</Title>
                    <Rating name="read-only" value={rating} readOnly />
                    {open && wiki === undefined ? renderSummarySkeleton() : <Summary>{wiki?.extract}</Summary>}
                </CardContent>
            </CardActionArea>
            {open && (
                <CardActions>
                    <Tooltip title="Search related movies">
                        <IconButton
                            color="secondary"
                            aria-label="Search related movies"
                            component="span"
                            onClick={onRelatedClick}
                        >
                            <SavedSearchIcon />
                        </IconButton>
                    </Tooltip>
                    {wiki === undefined ? (
                        <Skeleton variant="circular" width={25} height={25} />
                    ) : (
                        <Tooltip title="Go to Wikipedia">
                            <IconButton
                                component={Link}
                                target="_blank"
                                rel="noreferrer"
                                color="secondary"
                                aria-label="Go to Wikipedia"
                                href={`https://en.wikipedia.org/?curid=${wiki.pageid}`}
                            >
                                <PublicIcon />
                            </IconButton>
                        </Tooltip>
                    )}
                    {imdb === undefined ? (
                        <Skeleton variant="circular" width={25} height={25} />
                    ) : (
                        <Tooltip title="Go to IMDB">
                            <IconButton
                                component={Link}
                                color="secondary"
                                target="_blank"
                                rel="noreferrer"
                                aria-label="Go to IMDB"
                                href={`https://www.imdb.com/title/${imdb.id}`}
                            >
                                <MovieIcon />
                            </IconButton>
                        </Tooltip>
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

const Poster = styled(
    ({ className, image, alt }: PropsWithChildren<{ className?: string; image: string; alt: string }>) => (
        <CardMedia component="img" className={className} image={image} alt={alt} />
    ),
)(() => ({
    minHeight: '395px',
}));

const Title = styled(({ children, className }: PropsWithChildren<{ className?: string }>) => (
    <Typography variant="h5" component="h2" className={className}>
        {children}
    </Typography>
))(() => ({
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
}));

const Summary = styled(Typography)(() => ({
    textAlign: 'left',
    display: '-webkit-box',
    WebkitLineClamp: '5',
    WebkitBoxOrient: 'vertical',
    overflow: 'hidden',
}));

export default SearchResult;
