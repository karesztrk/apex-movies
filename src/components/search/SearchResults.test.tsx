import { render, screen } from '@/util/test';
import { Movie } from '.';
import SearchResults from './SearchResults';

describe('Searchresults', () => {
    const movies: Movie[] = [
        {
            id: '1',
            name: 'The Matrix',
            releaseDate: new Date(1999, 0, 1).toISOString(),
            score: 8.1,
            poster: {
                medium: '',
            },
        },
        {
            id: '2',
            name: 'The Matrix Reloaded',
            releaseDate: new Date(2003, 0, 1).toISOString(),
            score: 6.1,
            poster: {
                medium: '',
            },
        },
    ];

    it('renders main elements with empty data', () => {
        const { container } = render(<SearchResults data={[]} />);

        expect(container).not.toBeEmptyDOMElement();
    });

    it('renders movies', () => {
        render(<SearchResults data={movies} />);

        movies.forEach((movie) => {
            expect(screen.getByRole('heading', { name: movie.name })).toBeInTheDocument();
        });
    });
});
