import { red } from '@mui/material/colors';
import { createTheme } from '@mui/material/styles';

const theme = createTheme({
    palette: {
        primary: {
            main: '#2de1af',
        },
        secondary: {
            main: '#090733',
        },
        error: {
            main: red.A400,
        },
    },
    typography: {
        fontFamily: '"Poppins", sans-serif',
    },
});

export default theme;
