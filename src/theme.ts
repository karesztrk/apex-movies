import { createTheme } from '@mui/material/styles';
import { red } from '@mui/material/colors';

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
});

export default theme;
