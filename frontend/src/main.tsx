import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { store } from "./store/index.ts";
import { Provider } from "react-redux";
import SnackbarContainer from "./components/Snackbar/SnackbarContainer.tsx";

createRoot(document.getElementById("root")!).render(
  <Provider store={store}>
    <App />
    <SnackbarContainer />
  </Provider>
);
