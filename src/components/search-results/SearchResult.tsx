import { useSearchContext } from '@/context/SearchContext';
import { Button, Card, CardActions, CardContent, CardMedia, Link, Rating, Typography } from '@mui/material';
import { FC, useState } from 'react';
import { Movie } from './SearchResults';
import { findImdb, findWiki, ImdbPage, WikiPage } from './SearchResults.helper';

interface SearchResultProps {
    movie: Movie;
}

const SearchResult: FC<SearchResultProps> = ({ movie }) => {
    const [wiki, setWiki] = useState<WikiPage>();
    const [imdb, setImdb] = useState<ImdbPage>();
    const { updateRelatedMode, updateSelectedMovie } = useSearchContext();

    const onTitleClick = () => {
        const release = new Date(movie.releaseDate);
        if (!wiki) {
            findWiki(movie.name).then(setWiki);
        }
        if (!imdb) {
            findImdb(movie.name, release).then(setImdb);
        }
    };

    const onRelatedClick = () => {
        if (updateRelatedMode && updateSelectedMovie) {
            updateRelatedMode(true);
            updateSelectedMovie(movie);
        }
    };

    const rating = movie.score / 2;

    return (
        <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
            <CardMedia component="img" image={movie.poster?.medium} alt="random" />
            <CardContent sx={{ flexGrow: 1 }}>
                <Typography gutterBottom variant="h5" component="h2" onClick={onTitleClick}>
                    {movie.name}
                </Typography>
                <Rating name="read-only" value={rating} readOnly />
                {wiki?.extract && <Typography>{wiki?.extract}</Typography>}
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
        </Card>
    );
};

export default SearchResult;
