import { createTheme } from '@mui/material/styles';

const lightTheme = createTheme({
    palette: {
        primary: {
            main: '#1565c0',
        },
        secondary: {
            main: '#7b1fa2',
        },
    },
});

const darkTheme = createTheme({
    palette: {
        mode: 'dark',
        primary: {
            main: '#ff9800',
        },
        secondary: {
            main: '#3f51b5',
        },
    },
});

export { lightTheme, darkTheme };
