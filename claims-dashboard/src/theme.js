
const getDesignTokens = (mode) => ({
  palette: {
    mode,
    ...(mode === "light"
      ? {
          primary: { main: "#000090" },
          secondary: { main: "#ff9800" },
          background: { default: "#f4f6f8", paper: "#fff" },
        }
      : {
          primary: { main: "#000030" },
          secondary: { main: "#ffb74d" },
          background: { default: "#121212", paper: "#1e1e1e" },
        }),
  },
  typography: {
    fontFamily: "Inter, sans-serif",
    button: { textTransform: "none" },
  },
  components: {
    MuiButton: { styleOverrides: { root: { borderRadius: 8, padding: "10px 16px" } } },
    MuiPaper: { styleOverrides: { root: { borderRadius: 12, padding: 20 } } },
  },
});

export default getDesignTokens;
