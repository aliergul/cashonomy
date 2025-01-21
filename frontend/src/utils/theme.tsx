import { createTheme } from "@mui/material";

const theme = createTheme({
  typography: {
    fontFamily: "Cantarell, Arial, sans-serif",
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          fontFamily: "Cantarell, Arial, sans-serif",
          textTransform: "none",
          borderRadius: "0.25rem", // tailwind= rounded
        },
      },
      defaultProps: {},
    },
    MuiDivider: {
      styleOverrides: {
        root: {
          borderColor: "#FFEE00FF", // Çizgi rengi
          color: "#0062FFFF", // Yazı rengi (örneğin or yazısı için)
        },
      },
    },
  },
});

export default theme;
