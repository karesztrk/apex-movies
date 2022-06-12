import { render, screen } from '@testing-library/react';
import ProgressBar from './ProgressBar';

describe('ProgressBar', () => {
    test('renders main elements', () => {
        render(<ProgressBar />);

        expect(screen.getByRole('progressbar')).toBeInTheDocument();
    });
});
