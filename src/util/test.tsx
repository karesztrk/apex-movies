import { createTheme } from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';
import { render as rtlRender } from '@testing-library/react';
import { PropsWithChildren } from 'react';

const theme = createTheme({});

const render = (ui: React.ReactElement, ...renderOptions: []) => {
    const Wrapper = ({ children }: PropsWithChildren) => {
        return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
    };
    return rtlRender(ui, { wrapper: Wrapper, ...renderOptions });
};

export { screen } from '@testing-library/react';
export { render };
