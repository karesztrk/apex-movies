import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import App from './App';

test('simple render', () => {
    render(<App />);

    expect(screen.getByText('Vite.js example')).toBeInTheDocument();
});
