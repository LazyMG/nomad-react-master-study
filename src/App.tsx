import { RouterProvider } from "react-router-dom";
import { router } from "./router";
import { ThemeProvider } from "styled-components";
import { useRecoilValue } from "recoil";
import { lightThemeState } from "./atoms";
import { darkTheme, lightTheme } from "./theme";

function App() {
  const isLightTheme = useRecoilValue(lightThemeState);
  return (
    <ThemeProvider theme={isLightTheme ? lightTheme : darkTheme}>
      <RouterProvider router={router} />
    </ThemeProvider>
  );
}

export default App;
