import { render, screen } from '@/util/test';
import Layout from './Layout';

describe('Layout', () => {
    test('renders main elements', () => {
        render(<Layout />);

        expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('Apex Movies');
        expect(screen.getByRole('heading', { level: 2 })).toHaveTextContent('Looking for a movie?');
        expect(
            screen.getByText("Search for a move title, find any categories, browse it's Wiki or Imdb page"),
        ).toBeInTheDocument();
        expect(screen.getByRole('main')).toBeInTheDocument();
    });

    test('renders children', () => {
        const text = 'Apex Labs';
        const children = <div>{text}</div>;

        render(<Layout>${children}</Layout>);

        expect(screen.getByText(text)).toBeInTheDocument();
    });
});
