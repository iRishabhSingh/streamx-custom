import { StrictMode } from "react";
import { Provider } from "react-redux";
import { createRoot } from "react-dom/client";

import "@/index.css";
import App from "@/App.tsx";
import { store } from "@/app/store.ts";
import { ThemeProvider } from "@/components/theme-provider";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider store={store}>
      <ThemeProvider defaultTheme="dark" storageKey="streamx-ui-theme">
        <App />
      </ThemeProvider>
    </Provider>
  </StrictMode>,
);
