import { render, screen } from '@/util/test';
import SearchBar from './SearchBar';
import { vi } from 'vitest';
import { fireEvent } from '@testing-library/react';

describe('SearchBar', () => {
    test('renders main elements', () => {
        render(<SearchBar value="" />);

        expect(screen.getByRole('textbox')).toBeInTheDocument();
    });

    test('renders input value', () => {
        const value = 'Apex Labs';
        render(<SearchBar value={value} />);

        expect(screen.getByRole('textbox')).toHaveValue(value);
    });

    test('fires change callback', () => {
        const value = 'Apex Labs';
        const onChange = vi.fn();

        render(<SearchBar value="asdf" onChange={onChange} />);

        fireEvent.change(screen.getByRole('textbox'), { target: { value } });

        expect(onChange).toHaveBeenCalledWith(value);
    });
});
