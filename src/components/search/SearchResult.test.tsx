import { render, screen } from '@/util/test';
import { Movie } from '.';
import SearchResult from './SearchResult';

describe('SearchResult', () => {
    const movie: Movie = {
        id: '1',
        name: 'The Matrix',
        releaseDate: new Date(1999, 0, 1).toISOString(),
        score: 8.1,
        poster: {
            medium: '',
        },
    };

    it('renders main elements with empty data', () => {
        const movie = {} as Movie;
        render(<SearchResult data={movie} />);

        // Clickable area
        expect(screen.getByRole('button')).toBeInTheDocument();
        expect(screen.getByRole('img', { name: 'Movie poster' })).toBeInTheDocument();
        expect(screen.getByRole('heading')).toBeInTheDocument();
    });

    it('renders a movie', () => {
        render(<SearchResult data={movie} />);

        expect(screen.getByRole('img', { name: 'Movie poster' })).toBeInTheDocument();
        expect(screen.getByRole('img', { name: '4 Stars' })).toBeInTheDocument();
        expect(screen.getByRole('heading', { name: movie.name })).toBeInTheDocument();
    });
});
