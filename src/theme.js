import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      //   light: '#d3d3d3'
      main: '#1976d2'
      // dark: will be calculated from palette.primary.main,
      // contrastText: will be calculated to contrast with palette.primary.main
    }
    // secondary: {
    //   light: '#0066ff',
    //   main: '#0044ff',
    //   // dark: will be calculated from palette.secondary.main,
    //   contrastText: '#ffcc00'
    // },
    // // Provide every color token (light, main, dark, and contrastText) when using
    // // custom colors for props in Material UI's components.
    // // Then you will be able to use it like this: `<Button color="custom">`
    // // (For TypeScript, you need to add module augmentation for the `custom` value)
    // custom: {
    //   light: '#ffa726',
    //   main: '#f57c00',
    //   dark: '#ef6c00',
    //   contrastText: 'rgba(0, 0, 0, 0.87)'
    // }
  }
});

export default theme;
